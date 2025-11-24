import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiPlus, FiEdit2, FiTrash2, FiBook, FiCheckSquare, FiFileText } from 'react-icons/fi'

const ManageCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [chapters, setChapters] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [assignments, setAssignments] = useState([])
  const [activeTab, setActiveTab] = useState('chapters')

  useEffect(() => {
    fetchCourseData()
  }, [id])

  const fetchCourseData = async () => {
    try {
      const [courseRes, chaptersRes, quizzesRes, assignmentsRes] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get(`/courses/${id}/chapters`),
        api.get(`/courses/${id}/quizzes`),
        api.get(`/courses/${id}/assignments`)
      ])

      setCourse(courseRes.data)
      setChapters(chaptersRes.data)
      setQuizzes(quizzesRes.data)
      setAssignments(assignmentsRes.data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  if (!course) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{course.titre}</h1>
              <p className="text-sm sm:text-base text-gray-600">{course.description}</p>
              <span className="inline-block mt-3 sm:mt-4 bg-primary-100 text-primary-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                {course.categorie}
              </span>
            </div>
            <button
              onClick={() => navigate('/teacher/dashboard')}
              className="text-gray-600 hover:text-gray-800 text-sm sm:text-base whitespace-nowrap"
            >
              ← Retour
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-colors flex items-center justify-center text-xs sm:text-base ${
                activeTab === 'chapters'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiBook className="mr-1 sm:mr-2" /> Chapitres ({chapters.length})
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-colors flex items-center justify-center text-xs sm:text-base ${
                activeTab === 'quizzes'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiCheckSquare className="mr-1 sm:mr-2" /> Quiz ({quizzes.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 min-w-[120px] px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-colors flex items-center justify-center text-xs sm:text-base ${
                activeTab === 'assignments'
                  ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiFileText className="mr-1 sm:mr-2" /> Devoirs ({assignments.length})
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Chapitres */}
            {activeTab === 'chapters' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Chapitres</h2>
                  <Link
                    to={`/teacher/create-chapter/${id}`}
                    className="w-full sm:w-auto bg-primary-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-primary-700 transition-all flex items-center justify-center font-semibold text-sm sm:text-base"
                  >
                    <FiPlus className="mr-2" /> Ajouter un Chapitre
                  </Link>
                </div>

                {chapters.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FiBook className="text-gray-400 text-5xl mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucun chapitre pour le moment</p>
                    <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
                      Créer le Premier Chapitre
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chapters.map((chapter, index) => (
                      <div key={chapter.id_chapitre} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              Chapitre {index + 1}: {chapter.titre}
                            </h3>
                            <p className="text-gray-600">{chapter.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 p-2">
                              <FiEdit2 />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-2">
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quiz */}
            {activeTab === 'quizzes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
                  <Link
                    to={`/teacher/create-quiz/${id}`}
                    className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all flex items-center font-semibold"
                  >
                    <FiPlus className="mr-2" /> Créer un Quiz
                  </Link>
                </div>

                {quizzes.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FiCheckSquare className="text-gray-400 text-5xl mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucun quiz pour le moment</p>
                    <Link
                      to={`/teacher/create-quiz/${id}`}
                      className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                    >
                      Créer le Premier Quiz
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quizzes.map(quiz => (
                      <div key={quiz.id_quiz} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-800">{quiz.titre}</h3>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 p-2">
                              <FiEdit2 />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-2">
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Devoirs */}
            {activeTab === 'assignments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Devoirs</h2>
                  <Link
                    to={`/teacher/create-assignment/${id}`}
                    className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all flex items-center font-semibold"
                  >
                    <FiPlus className="mr-2" /> Créer un Devoir
                  </Link>
                </div>

                {assignments.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FiFileText className="text-gray-400 text-5xl mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucun devoir pour le moment</p>
                    <Link
                      to={`/teacher/create-assignment/${id}`}
                      className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                    >
                      Créer le Premier Devoir
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignments.map(assignment => (
                      <div key={assignment.id_devoir} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.titre}</h3>
                            <p className="text-gray-600 mb-2">{assignment.description}</p>
                            <p className="text-sm text-gray-500">
                              Date limite: {new Date(assignment.date_limite).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 p-2">
                              <FiEdit2 />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-2">
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCourse
