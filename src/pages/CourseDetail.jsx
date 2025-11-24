import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { FiBook, FiFileText, FiCheckSquare, FiPlay } from 'react-icons/fi'

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [chapters, setChapters] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [assignments, setAssignments] = useState([])
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    fetchCourseDetails()
  }, [id])

  const fetchCourseDetails = async () => {
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
      console.error('Erreur lors du chargement du cours')
    }
  }

  const handleEnroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll`)
      setEnrolled(true)
    } catch (error) {
      console.error('Erreur lors de l\'inscription')
    }
  }

  if (!course) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{course.titre}</h1>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{course.description}</p>
              <span className="bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm inline-block">
                {course.categorie}
              </span>
            </div>
            {!enrolled && (
              <button
                onClick={handleEnroll}
                className="w-full lg:w-auto bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap"
              >
                S'inscrire au cours
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Chapters */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center">
                <FiBook className="mr-2 text-lg sm:text-xl" /> Chapitres
              </h2>
              {chapters.length === 0 ? (
                <p className="text-gray-500 text-sm sm:text-base">Aucun chapitre disponible</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {chapters.map((chapter, index) => (
                    <Link
                      key={chapter.id_chapitre}
                      to={`/chapters/${chapter.id_chapitre}`}
                      className="block p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <FiPlay className="text-primary mt-1 sm:mt-0 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">Chapitre {index + 1}: {chapter.titre}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">{chapter.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quizzes */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center">
                <FiCheckSquare className="mr-2 text-lg sm:text-xl" /> Quiz
              </h2>
              {quizzes.length === 0 ? (
                <p className="text-gray-500 text-sm sm:text-base">Aucun quiz disponible</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {quizzes.map(quiz => (
                    <Link
                      key={quiz.id_quiz}
                      to={`/quiz/${quiz.id_quiz}`}
                      className="block p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-sm sm:text-base">{quiz.titre}</h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Assignments */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                <FiFileText className="mr-2" /> Devoirs
              </h2>
              {assignments.length === 0 ? (
                <p className="text-gray-500 text-xs sm:text-sm">Aucun devoir</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {assignments.map(assignment => (
                    <Link
                      key={assignment.id_devoir}
                      to={`/assignments/${assignment.id_devoir}`}
                      className="block p-2.5 sm:p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-xs sm:text-sm line-clamp-2">{assignment.titre}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Date limite: {new Date(assignment.date_limite).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
