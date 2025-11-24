import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'

const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: 'Informatique'
  })

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`)
      setFormData({
        titre: response.data.titre,
        description: response.data.description,
        categorie: response.data.categorie
      })
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors du chargement du cours')
      navigate('/teacher/dashboard')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.titre || !formData.description) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      await api.put(`/courses/${id}`, formData)
      alert('Cours modifié avec succès!')
      navigate('/teacher/dashboard')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la modification du cours')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl text-gray-600">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Modifier le cours</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du cours *
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Introduction à Python"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Décrivez le contenu et les objectifs du cours..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="Informatique">Informatique</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Sciences">Sciences</option>
                <option value="Langues">Langues</option>
                <option value="Histoire">Histoire</option>
                <option value="Géographie">Géographie</option>
                <option value="Arts">Arts</option>
                <option value="Musique">Musique</option>
                <option value="Sport">Sport</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all font-semibold"
              >
                Enregistrer les modifications
              </button>
              <button
                type="button"
                onClick={() => navigate('/teacher/dashboard')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCourse
