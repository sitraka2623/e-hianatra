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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.titre}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                {course.categorie}
              </span>
            </div>
            {!enrolled && (
              <button
                onClick={handleEnroll}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                S'inscrire au cours
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Chapters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FiBook className="mr-2" /> Chapitres
              </h2>
              {chapters.length === 0 ? (
                <p className="text-gray-500">Aucun chapitre disponible</p>
              ) : (
                <div className="space-y-3">
                  {chapters.map((chapter, index) => (
                    <Link
                      key={chapter.id_chapitre}
                      to={`/chapters/${chapter.id_chapitre}`}
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <FiPlay className="text-primary mr-3" />
                        <div>
                          <h3 className="font-semibold">Chapitre {index + 1}: {chapter.titre}</h3>
                          <p className="text-sm text-gray-600">{chapter.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quizzes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FiCheckSquare className="mr-2" /> Quiz
              </h2>
              {quizzes.length === 0 ? (
                <p className="text-gray-500">Aucun quiz disponible</p>
              ) : (
                <div className="space-y-3">
                  {quizzes.map(quiz => (
                    <Link
                      key={quiz.id_quiz}
                      to={`/quiz/${quiz.id_quiz}`}
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold">{quiz.titre}</h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FiFileText className="mr-2" /> Devoirs
              </h2>
              {assignments.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun devoir</p>
              ) : (
                <div className="space-y-3">
                  {assignments.map(assignment => (
                    <Link
                      key={assignment.id_devoir}
                      to={`/assignments/${assignment.id_devoir}`}
                      className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-sm">{assignment.titre}</h3>
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
