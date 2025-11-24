import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi'

const CreateQuiz = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const [quizData, setQuizData] = useState({
    titre: '',
    description: '',
    duree_minutes: 30,
    note_passage: 50
  })

  const [questions, setQuestions] = useState([
    {
      question: '',
      type: 'choix_multiple',
      points: 1,
      options: ['', '', '', ''],
      reponse_correcte: 0
    }
  ])

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      type: 'choix_multiple',
      points: 1,
      options: ['', '', '', ''],
      reponse_correcte: 0
    }])
  }

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions]
    newQuestions[index][field] = value
    setQuestions(newQuestions)
  }

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options[optionIndex] = value
    setQuestions(newQuestions)
  }

  const addOption = (questionIndex) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push('')
    setQuestions(newQuestions)
  }

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions]
    if (newQuestions[questionIndex].options.length > 2) {
      newQuestions[questionIndex].options.splice(optionIndex, 1)
      setQuestions(newQuestions)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Créer le quiz
      const quizResponse = await api.post(`/courses/${courseId}/quizzes`, quizData)
      const quizId = quizResponse.data.id_quiz

      // Ajouter les questions
      for (const question of questions) {
        await api.post(`/quizzes/${quizId}/questions`, {
          question: question.question,
          type: question.type,
          points: question.points,
          options: JSON.stringify(question.options),
          reponse_correcte: question.reponse_correcte
        })
      }

      alert('Quiz créé avec succès!')
      navigate(`/teacher/manage-course/${courseId}`)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création du quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Créer un Quiz</h1>
            <button
              onClick={() => navigate(`/teacher/manage-course/${courseId}`)}
              className="text-gray-600 hover:text-gray-800 text-sm sm:text-base"
            >
              ← Retour
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Informations du Quiz */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                Informations Générales
              </h2>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Titre du Quiz *
                </label>
                <input
                  type="text"
                  required
                  value={quizData.titre}
                  onChange={(e) => setQuizData({...quizData, titre: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                  placeholder="Ex: Quiz Chapitre 1 - Les Bases"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                  placeholder="Description du quiz..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Durée (minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={quizData.duree_minutes}
                    onChange={(e) => setQuizData({...quizData, duree_minutes: parseInt(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Note de Passage (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={quizData.note_passage}
                    onChange={(e) => setQuizData({...quizData, note_passage: parseInt(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Questions</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="w-full sm:w-auto bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center text-xs sm:text-sm"
                >
                  <FiPlus className="mr-2" /> Ajouter une Question
                </button>
              </div>

              {questions.map((question, qIndex) => (
                <div key={qIndex} className="border-2 border-gray-200 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                      Question {qIndex + 1}
                    </h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <FiTrash2 className="text-lg sm:text-xl" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Question *
                    </label>
                    <textarea
                      required
                      value={question.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      rows="2"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      placeholder="Entrez votre question..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      >
                        <option value="choix_multiple">Choix Multiple</option>
                        <option value="vrai_faux">Vrai/Faux</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Points
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={question.points}
                        onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value))}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                        Options de Réponse
                      </label>
                      <button
                        type="button"
                        onClick={() => addOption(qIndex)}
                        className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm whitespace-nowrap"
                      >
                        + Ajouter une option
                      </button>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={question.reponse_correcte === oIndex}
                            onChange={() => updateQuestion(qIndex, 'reponse_correcte', oIndex)}
                            className="w-4 h-4 text-primary-600 flex-shrink-0"
                          />
                          <input
                            type="text"
                            required
                            value={option}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          {question.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(qIndex, oIndex)}
                              className="text-red-600 hover:text-red-700 p-1 flex-shrink-0"
                            >
                              <FiTrash2 className="text-base sm:text-lg" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Sélectionnez la bonne réponse en cochant le bouton radio
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 pt-4 sm:pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate(`/teacher/manage-course/${courseId}`)}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm sm:text-base"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-primary-700 transition-all flex items-center justify-center font-semibold disabled:opacity-50 text-sm sm:text-base"
              >
                <FiSave className="mr-2" />
                {loading ? 'Création...' : 'Créer le Quiz'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateQuiz
