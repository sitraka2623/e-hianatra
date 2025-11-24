import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiBook, FiUsers, FiFileText, FiPlus } from 'react-icons/fi'

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    pendingAssignments: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/teacher/dashboard')
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Enseignant</h1>
          <Link to="/teacher/create-course" className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center font-semibold">
            <FiPlus className="mr-2" /> Créer un cours
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Mes cours</p>
                <p className="text-3xl font-bold text-primary">{stats.totalCourses}</p>
              </div>
              <FiBook className="text-primary text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total étudiants</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
              </div>
              <FiUsers className="text-green-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Devoirs à corriger</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingAssignments}</p>
              </div>
              <FiFileText className="text-orange-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Mes Cours */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes Cours</h2>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Vous n'avez créé aucun cours</p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Créer mon premier cours
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id_cours} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{course.titre}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">{course.studentCount || 0} étudiants</span>
                    <Link 
                      to={`/teacher/manage-course/${course.id_cours}`} 
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                    >
                      Gérer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
