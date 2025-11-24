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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord Étudiant</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cours inscrits</p>
                <p className="text-3xl font-bold text-primary">{stats.enrolledCourses}</p>
              </div>
              <FiBook className="text-primary text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cours terminés</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
              </div>
              <FiCheckCircle className="text-green-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">En cours</p>
                <p className="text-3xl font-bold text-orange-600">{stats.inProgressCourses}</p>
              </div>
              <FiClock className="text-orange-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Progression</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalProgress}%</p>
              </div>
              <FiTrendingUp className="text-purple-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Mes Cours */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mes Cours</h2>
            <Link to="/courses" className="text-primary hover:underline">
              Voir tous les cours
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Vous n'êtes inscrit à aucun cours</p>
              <Link to="/courses" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Parcourir les cours
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link key={course.id_cours} to={`/courses/${course.id_cours}`}>
                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{course.titre}</h3>
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{course.progress || 0}% complété</p>
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
