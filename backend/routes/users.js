import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Récupérer le profil de l'utilisateur connecté
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id_user, nom, prenom, email, role FROM utilisateur WHERE id_user = ?',
      [req.user.id]
    )

    if (users.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    res.json(users[0])
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' })
  }
})

// Mettre à jour le profil
router.put('/profile', authenticateToken, async (req, res) => {
  const { nom, prenom, email } = req.body

  try {
    await pool.query(
      'UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id_user = ?',
      [nom, prenom, email, req.user.id]
    )

    res.json({ message: 'Profil mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' })
  }
})

export default router
