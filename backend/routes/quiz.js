import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Récupérer un quiz
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [quizzes] = await pool.query(
      'SELECT * FROM quiz WHERE id_quiz = ?',
      [req.params.id]
    )

    if (quizzes.length === 0) {
      return res.status(404).json({ error: 'Quiz non trouvé' })
    }

    res.json(quizzes[0])
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du quiz' })
  }
})

// Récupérer les questions d'un quiz
router.get('/:id/questions', authenticateToken, async (req, res) => {
  try {
    const [questions] = await pool.query(
      'SELECT * FROM question WHERE id_quiz = ?',
      [req.params.id]
    )

    // Récupérer les options pour chaque question
    for (let question of questions) {
      const [options] = await pool.query(
        'SELECT * FROM option_question WHERE id_question = ?',
        [question.id_question]
      )
      question.options = options
    }

    res.json(questions)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des questions' })
  }
})

// Soumettre un quiz
router.post('/:id/submit', authenticateToken, async (req, res) => {
  const { answers } = req.body

  try {
    let correctAnswers = 0
    let totalQuestions = 0

    for (const [questionId, optionId] of Object.entries(answers)) {
      const [options] = await pool.query(
        'SELECT est_correct FROM option_question WHERE id_option = ?',
        [optionId]
      )

      if (options.length > 0 && options[0].est_correct) {
        correctAnswers++
      }
      totalQuestions++
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100)

    res.json({ 
      score,
      correctAnswers,
      totalQuestions
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la soumission du quiz' })
  }
})

export default router
