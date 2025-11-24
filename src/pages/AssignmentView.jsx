import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { FiUpload, FiFile, FiCheckCircle } from 'react-icons/fi'

const AssignmentView = () => {
  const { id } = useParams()
  const [assignment, setAssignment] = useState(null)
  const [file, setFile] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchAssignmentData()
  }, [id])

  const fetchAssignmentData = async () => {
    try {
      const [assignmentRes, submissionRes] = await Promise.all([
        api.get(`/assignments/${id}`),
        api.get(`/assignments/${id}/submission`).catch(() => ({ data: null }))
      ])
      setAssignment(assignmentRes.data)
      setSubmission(submissionRes.data)
    } catch (error) {
      console.error('Erreur lors du chargement du devoir')
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post(`/assignments/${id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSubmission(response.data)
      setFile(null)
    } catch (error) {
      console.error('Erreur lors de la soumission')
    } finally {
      setUploading(false)
    }
  }

  if (!assignment) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  const isLate = new Date() > new Date(assignment.date_limite)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{assignment.titre}</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">{assignment.description}</p>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-4">
                Date limite: {new Date(assignment.date_limite).toLocaleDateString('fr-FR')}
              </span>
              {isLate && (
                <span className="text-red-500 font-semibold">En retard</span>
              )}
            </div>
          </div>

          {submission ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FiCheckCircle className="text-green-600 text-2xl mr-2" />
                <h3 className="text-xl font-semibold text-green-800">Devoir soumis</h3>
              </div>
              <p className="text-gray-700 mb-2">
                Fichier: {submission.fichier}
              </p>
              {submission.note !== null && (
                <p className="text-lg font-semibold text-green-700">
                  Note: {submission.note}/20
                </p>
              )}
              {submission.note === null && (
                <p className="text-gray-600">En attente de correction</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <FiUpload className="text-gray-400 text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Soumettre votre devoir</h3>
                <p className="text-gray-600 mb-4">Sélectionnez un fichier à télécharger</p>
                
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.zip"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-200 mb-4"
                >
                  Choisir un fichier
                </label>

                {file && (
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <FiFile className="mr-2" />
                    {file.name}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Envoi en cours...' : 'Soumettre'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignmentView
