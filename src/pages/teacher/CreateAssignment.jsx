import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiSave, FiCalendar, FiFileText } from 'react-icons/fi'

const CreateAssignment = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const [assignmentData, setAssignmentData] = useState({
    titre: '',
    description: '',
    consignes: '',
    date_limite: '',
    note_max: 100,
    type_soumission: 'texte'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post(`/courses/${courseId}/assignments`, assignmentData)
      alert('Devoir créé avec succès!')
      navigate(`/teacher/manage-course/${courseId}`)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création du devoir')
    } finally {
      setLoading(false)
    }
  }

  // Date minimale = aujourd'hui
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Créer un Devoir</h1>
            <button
              onClick={() => navigate(`/teacher/manage-course/${courseId}`)}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Retour
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre du Devoir *
              </label>
              <input
                type="text"
                required
                value={assignmentData.titre}
                onChange={(e) => setAssignmentData({...assignmentData, titre: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                placeholder="Ex: Projet Final - Application Web"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={assignmentData.description}
                onChange={(e) => setAssignmentData({...assignmentData, description: e.target.value})}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                placeholder="Description générale du devoir..."
              />
            </div>

            {/* Consignes détaillées */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Consignes Détaillées *
              </label>
              <textarea
                required
                value={assignmentData.consignes}
                onChange={(e) => setAssignmentData({...assignmentData, consignes: e.target.value})}
                rows="8"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                placeholder="Instructions détaillées pour réaliser le devoir...&#10;&#10;Exemple:&#10;1. Créer une application web responsive&#10;2. Utiliser HTML, CSS et JavaScript&#10;3. Implémenter les fonctionnalités suivantes:&#10;   - Formulaire de contact&#10;   - Validation des données&#10;   - Design moderne&#10;4. Soumettre le code source et une capture d'écran"
              />
              <p className="text-sm text-gray-500 mt-2">
                Soyez précis dans vos consignes pour aider les étudiants à comprendre ce qui est attendu
              </p>
            </div>

            {/* Date limite et Note max */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Date Limite *
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={assignmentData.date_limite}
                  onChange={(e) => setAssignmentData({...assignmentData, date_limite: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note Maximale
                </label>
                <input
                  type="number"
                  min="1"
                  value={assignmentData.note_max}
                  onChange={(e) => setAssignmentData({...assignmentData, note_max: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Type de soumission */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FiFileText className="inline mr-2" />
                Type de Soumission
              </label>
              <select
                value={assignmentData.type_soumission}
                onChange={(e) => setAssignmentData({...assignmentData, type_soumission: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
              >
                <option value="texte">Texte</option>
                <option value="fichier">Fichier</option>
                <option value="lien">Lien URL</option>
                <option value="mixte">Texte + Fichier</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">
                {assignmentData.type_soumission === 'texte' && 'Les étudiants soumettront leur réponse sous forme de texte'}
                {assignmentData.type_soumission === 'fichier' && 'Les étudiants téléchargeront un fichier (PDF, ZIP, etc.)'}
                {assignmentData.type_soumission === 'lien' && 'Les étudiants fourniront un lien (GitHub, Google Drive, etc.)'}
                {assignmentData.type_soumission === 'mixte' && 'Les étudiants peuvent soumettre du texte et des fichiers'}
              </p>
            </div>

            {/* Critères d'évaluation */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">💡 Conseils pour l'évaluation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Définissez des critères d'évaluation clairs</li>
                <li>• Indiquez le barème de notation</li>
                <li>• Précisez les attentes pour chaque niveau de note</li>
                <li>• Mentionnez les pénalités pour retard si applicable</li>
              </ul>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate(`/teacher/manage-course/${courseId}`)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-all flex items-center font-semibold disabled:opacity-50"
              >
                <FiSave className="mr-2" />
                {loading ? 'Création...' : 'Créer le Devoir'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAssignment
