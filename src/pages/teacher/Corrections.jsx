import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiFileText, FiDownload, FiCheck, FiX } from 'react-icons/fi'

const Corrections = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [grade, setGrade] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      // Cette route devrait être ajoutée au backend
      const response = await api.get('/teacher/submissions/pending')
      setSubmissions(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGrade = async (submissionId) => {
    try {
      await api.put(`/submissions/${submissionId}/grade`, { note: parseFloat(grade) })
      fetchSubmissions()
      setSelectedSubmission(null)
      setGrade('')
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Devoirs à Corriger</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
            <FiFileText className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun devoir à corriger</h3>
            <p className="text-gray-600">Tous les devoirs ont été corrigés !</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map(submission => (
              <div key={submission.id_soumission} className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{submission.devoir_titre}</h3>
                    <p className="text-sm text-gray-600">{submission.etudiant_nom} {submission.etudiant_prenom}</p>
                  </div>
                  <FiFileText className="text-primary-600 text-2xl" />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Soumis le: {new Date(submission.date_soumission).toLocaleDateString('fr-FR')}
                  </p>
                  <a
                    href={submission.fichier}
                    download
                    className="text-primary-600 hover:text-primary-700 text-sm flex items-center font-medium"
                  >
                    <FiDownload className="mr-1" /> Télécharger le fichier
                  </a>
                </div>

                <button
                  onClick={() => setSelectedSubmission(submission)}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  Noter ce Devoir
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal de notation */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Noter le Devoir</h3>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Étudiant</p>
                <p className="font-semibold text-gray-800">
                  {selectedSubmission.etudiant_nom} {selectedSubmission.etudiant_prenom}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Devoir</p>
                <p className="font-semibold text-gray-800">{selectedSubmission.devoir_titre}</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Note sur 20
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Ex: 15.5"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedSubmission(null)
                    setGrade('')
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold flex items-center justify-center"
                >
                  <FiX className="mr-2" /> Annuler
                </button>
                <button
                  onClick={() => handleGrade(selectedSubmission.id_soumission)}
                  disabled={!grade || parseFloat(grade) < 0 || parseFloat(grade) > 20}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FiCheck className="mr-2" /> Valider
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Corrections
