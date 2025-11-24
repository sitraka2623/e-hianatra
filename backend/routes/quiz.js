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
      'SELECT * FROM questions_quiz WHERE id_quiz = ?',
      [req.params.id]
    )

    // Les options sont stockées en JSON dans la colonne options
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

    for (const [questionId, answer] of Object.entries(answers)) {
      const [questions] = await pool.query(
        'SELECT reponse_correcte FROM questions_quiz WHERE id_question = ?',
        [questionId]
      )

      if (questions.length > 0) {
        totalQuestions++
        if (questions[0].reponse_correcte === answer) {
          correctAnswers++
        }
        
        // Enregistrer la réponse
        await pool.query(
          'INSERT INTO reponses_quiz (id_question, id_user, reponse, est_correcte) VALUES (?, ?, ?, ?)',
          [questionId, req.user.id, answer, questions[0].reponse_correcte === answer]
        )
      }
    }

    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

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
