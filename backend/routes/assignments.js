import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Récupérer un devoir
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [assignments] = await pool.query(
      'SELECT * FROM devoirs WHERE id_devoir = ?',
      [req.params.id]
    )

    if (assignments.length === 0) {
      return res.status(404).json({ error: 'Devoir non trouvé' })
    }

    res.json(assignments[0])
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du devoir' })
  }
})

// Récupérer la soumission d'un étudiant
router.get('/:id/submission', authenticateToken, async (req, res) => {
  try {
    const [submissions] = await pool.query(
      'SELECT * FROM soumissions_devoirs WHERE id_devoir = ? AND id_user = ?',
      [req.params.id, req.user.id]
    )

    if (submissions.length === 0) {
      return res.json(null)
    }

    res.json(submissions[0])
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération de la soumission' })
  }
})

// Soumettre un devoir
router.post('/:id/submit', authenticateToken, async (req, res) => {
  const { fichier } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO soumissions_devoirs (id_devoir, id_user, fichier_url, date_soumission) VALUES (?, ?, ?, NOW())',
      [req.params.id, req.user.id, fichier]
    )

    res.json({ 
      message: 'Devoir soumis avec succès',
      submissionId: result.insertId
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la soumission du devoir' })
  }
})

export default router
