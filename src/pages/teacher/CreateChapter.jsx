import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi'

const CreateChapter = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    ordre: 1
  })

  const [contents, setContents] = useState([
    {
      type: 'GUIDE',
      titre: '',
      logiciels: [''],
      etapes: [
        { numero: 1, titre: '', description: '', details: '' }
      ]
    }
  ])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addLogiciel = (contentIndex) => {
    const newContents = [...contents]
    newContents[contentIndex].logiciels.push('')
    setContents(newContents)
  }

  const updateLogiciel = (contentIndex, logicielIndex, value) => {
    const newContents = [...contents]
    newContents[contentIndex].logiciels[logicielIndex] = value
    setContents(newContents)
  }

  const removeLogiciel = (contentIndex, logicielIndex) => {
    const newContents = [...contents]
    newContents[contentIndex].logiciels.splice(logicielIndex, 1)
    setContents(newContents)
  }

  const addEtape = (contentIndex) => {
    const newContents = [...contents]
    const newNumero = newContents[contentIndex].etapes.length + 1
    newContents[contentIndex].etapes.push({
      numero: newNumero,
      titre: '',
      description: '',
      details: ''
    })
    setContents(newContents)
  }

  const updateEtape = (contentIndex, etapeIndex, field, value) => {
    const newContents = [...contents]
    newContents[contentIndex].etapes[etapeIndex][field] = value
    setContents(newContents)
  }

  const removeEtape = (contentIndex, etapeIndex) => {
    const newContents = [...contents]
    newContents[contentIndex].etapes.splice(etapeIndex, 1)
    // Renuméroter les étapes
    newContents[contentIndex].etapes.forEach((etape, idx) => {
      etape.numero = idx + 1
    })
    setContents(newContents)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Créer le chapitre
      const chapterResponse = await api.post(`/courses/${courseId}/chapters`, formData)
      const chapterId = chapterResponse.data.chapterId

      // Créer les contenus
      for (const content of contents) {
        await api.post(`/chapters/${chapterId}/contents`, {
          type: content.type,
          titre: content.titre,
          logiciels: JSON.stringify(content.logiciels.filter(l => l.trim())),
          etapes: JSON.stringify(content.etapes)
        })
      }

      navigate(`/teacher/manage-course/${courseId}`)
    } catch (err) {
      setError('Erreur lors de la création du chapitre')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Créer un Chapitre</h1>
          <button
            onClick={() => navigate(`/teacher/manage-course/${courseId}`)}
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations du chapitre */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations du Chapitre</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Titre du Chapitre *
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Introduction à Python"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Décrivez brièvement le contenu de ce chapitre..."
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Ordre
                </label>
                <input
                  type="number"
                  name="ordre"
                  value={formData.ordre}
                  onChange={handleChange}
                  min="1"
                  className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contenu du chapitre */}
          {contents.map((content, contentIndex) => (
            <div key={contentIndex} className="bg-white rounded-2xl shadow-soft p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Guide Pédagogique</h2>

              {/* Titre du guide */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Titre du Guide *
                </label>
                <input
                  type="text"
                  value={content.titre}
                  onChange={(e) => {
                    const newContents = [...contents]
                    newContents[contentIndex].titre = e.target.value
                    setContents(newContents)
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Installation de Python"
                  required
                />
              </div>

              {/* Logiciels requis */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-sm font-semibold">
                    Logiciels Requis
                  </label>
                  <button
                    type="button"
                    onClick={() => addLogiciel(contentIndex)}
                    className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                  >
                    <FiPlus className="mr-1" /> Ajouter
                  </button>
                </div>
                <div className="space-y-2">
                  {content.logiciels.map((logiciel, logicielIndex) => (
                    <div key={logicielIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={logiciel}
                        onChange={(e) => updateLogiciel(contentIndex, logicielIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Ex: Python 3.11+"
                      />
                      {content.logiciels.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLogiciel(contentIndex, logicielIndex)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Étapes */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-gray-700 text-sm font-semibold">
                    Étapes du Guide *
                  </label>
                  <button
                    type="button"
                    onClick={() => addEtape(contentIndex)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm flex items-center"
                  >
                    <FiPlus className="mr-1" /> Ajouter une Étape
                  </button>
                </div>

                <div className="space-y-6">
                  {content.etapes.map((etape, etapeIndex) => (
                    <div key={etapeIndex} className="border-2 border-gray-200 rounded-xl p-6 relative">
                      <div className="absolute -left-4 -top-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {etape.numero}
                      </div>

                      {content.etapes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEtape(contentIndex, etapeIndex)}
                          className="absolute top-4 right-4 text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      )}

                      <div className="space-y-4 mt-2">
                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Titre de l'Étape *
                          </label>
                          <input
                            type="text"
                            value={etape.titre}
                            onChange={(e) => updateEtape(contentIndex, etapeIndex, 'titre', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Ex: Télécharger Python"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Description *
                          </label>
                          <textarea
                            value={etape.description}
                            onChange={(e) => updateEtape(contentIndex, etapeIndex, 'description', e.target.value)}
                            rows="2"
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            placeholder="Description principale de l'étape..."
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Détails et Conseils
                          </label>
                          <textarea
                            value={etape.details}
                            onChange={(e) => updateEtape(contentIndex, etapeIndex, 'details', e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
                            placeholder="Ajoutez des détails, exemples de code, conseils...&#10;Utilisez \n pour les sauts de ligne"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Boutons */}
          <div className="flex justify-end space-x-4">
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
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <FiSave className="mr-2" />
              {loading ? 'Création...' : 'Créer le Chapitre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateChapter
