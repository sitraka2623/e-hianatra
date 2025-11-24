import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiBook, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi'

const StudentDashboard = () => {
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalProgress: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/student/dashboard')
      setCourses(response.data.courses || [])
      setStats(response.data.stats || stats)
    } catch (error) {
      console.error('Erreur lors du chargement des données')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8">Tableau de bord Étudiant</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-500 text-xs sm:text-sm">Cours inscrits</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stats.enrolledCourses}</p>
              </div>
              <FiBook className="text-primary text-2xl sm:text-4xl" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-500 text-xs sm:text-sm">Cours terminés</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.completedCourses}</p>
              </div>
              <FiCheckCircle className="text-green-600 text-2xl sm:text-4xl" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-500 text-xs sm:text-sm">En cours</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.inProgressCourses}</p>
              </div>
              <FiClock className="text-orange-600 text-2xl sm:text-4xl" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-500 text-xs sm:text-sm">Progression</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.totalProgress}%</p>
              </div>
              <FiTrendingUp className="text-purple-600 text-2xl sm:text-4xl" />
            </div>
          </div>
        </div>

        {/* Mes Cours */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Mes Cours</h2>
            <Link to="/courses" className="text-primary hover:underline text-sm sm:text-base">
              Voir tous les cours
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 mb-4 text-sm sm:text-base">Vous n'êtes inscrit à aucun cours</p>
              <Link to="/courses" className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base inline-block">
                Parcourir les cours
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course) => (
                <Link key={course.id_cours} to={`/courses/${course.id_cours}`}>
                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{course.titre}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">{course.progress || 0}% complété</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
