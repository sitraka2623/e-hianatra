import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiSave, FiX } from 'react-icons/fi'

const CreateCourse = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: ''
  })

  const categories = [
    'Programmation',
    'Développement Web',
    'Design',
    'Marketing',
    'Base de Données',
    'IA & Data Science',
    'Bureautique',
    'Langues',
    'Autre'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/courses', formData)
      navigate('/teacher/dashboard')
    } catch (err) {
      setError('Erreur lors de la création du cours')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Créer un Nouveau Cours</h1>
          <button
            onClick={() => navigate('/teacher/dashboard')}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <FiX className="mr-1" /> Annuler
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8">
          <div className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Titre du Cours *
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Ex: Introduction à Python"
                required
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Catégorie *
              </label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                placeholder="Décrivez le contenu et les objectifs du cours..."
                required
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/teacher/dashboard')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FiSave className="mr-2" />
                {loading ? 'Création...' : 'Créer le Cours'}
              </button>
            </div>
          </div>
        </form>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Astuce :</strong> Après avoir créé le cours, vous pourrez ajouter des chapitres, des quiz et des devoirs depuis la page de gestion du cours.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
