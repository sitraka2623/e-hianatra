import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiUsers, FiBook, FiActivity, FiSettings } from 'react-icons/fi'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalStudents: 0,
    totalTeachers: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard')
      setStats(response.data.stats || stats)
    } catch (error) {
      console.error('Erreur lors du chargement des données')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord Administrateur</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total utilisateurs</p>
                <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
              </div>
              <FiUsers className="text-primary text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total cours</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalCourses}</p>
              </div>
              <FiBook className="text-green-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Étudiants</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
              </div>
              <FiActivity className="text-blue-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Enseignants</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalTeachers}</p>
              </div>
              <FiSettings className="text-purple-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h3>
            <p className="text-gray-600 mb-4">Gérer les comptes étudiants et enseignants</p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
              Accéder
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Gestion des cours</h3>
            <p className="text-gray-600 mb-4">Modérer et gérer les cours de la plateforme</p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
              Accéder
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Statistiques</h3>
            <p className="text-gray-600 mb-4">Voir les statistiques détaillées</p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
              Accéder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
