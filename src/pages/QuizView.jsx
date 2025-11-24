import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

const QuizView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetchQuizData()
  }, [id])

  const fetchQuizData = async () => {
    try {
      const [quizRes, questionsRes] = await Promise.all([
        api.get(`/quiz/${id}`),
        api.get(`/quiz/${id}/questions`)
      ])
      setQuiz(quizRes.data)
      setQuestions(questionsRes.data)
    } catch (error) {
      console.error('Erreur lors du chargement du quiz')
    }
  }

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId })
  }

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/quiz/${id}/submit`, { answers })
      setScore(response.data.score)
      setSubmitted(true)
    } catch (error) {
      console.error('Erreur lors de la soumission')
    }
  }

  if (!quiz) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">{quiz.titre}</h1>

          {submitted ? (
            <div className="text-center py-12">
              <div className="mb-6">
                {score >= 50 ? (
                  <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                ) : (
                  <FiXCircle className="text-red-500 text-6xl mx-auto mb-4" />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Score: {score}%
              </h2>
              <p className="text-gray-600 mb-6">
                {score >= 50 ? 'Félicitations ! Vous avez réussi le quiz.' : 'Continuez vos efforts !'}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Retour au cours
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {questions.map((question, index) => (
                  <div key={question.id_question} className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {index + 1}. {question.libelle}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map(option => (
                        <label
                          key={option.id_option}
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id_question}`}
                            value={option.id_option}
                            onChange={() => handleAnswerChange(question.id_question, option.id_option)}
                            className="mr-3"
                          />
                          <span>{option.libelle}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Soumettre le quiz
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizView
