import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { FiUser, FiMail, FiEdit2, FiSave } from 'react-icons/fi'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile')
      setProfile(response.data)
      setFormData({
        nom: response.data.nom,
        prenom: response.data.prenom,
        email: response.data.email
      })
    } catch (error) {
      console.error('Erreur lors du chargement du profil')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put('/profile', formData)
      setEditing(false)
      fetchProfile()
    } catch (error) {
      console.error('Erreur lors de la mise à jour')
    }
  }

  if (!profile) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Profil</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mr-4">
                {profile.prenom[0]}{profile.nom[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.prenom} {profile.nom}</h2>
                <p className="text-gray-600">{profile.role}</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center text-primary hover:underline"
            >
              <FiEdit2 className="mr-1" />
              {editing ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiSave className="mr-2" /> Enregistrer
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <FiUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-semibold">{profile.prenom} {profile.nom}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FiMail className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{profile.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
