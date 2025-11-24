import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Récupérer les conversations
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const [conversations] = await pool.query(`
      SELECT DISTINCT u.id_user, u.nom, u.prenom, u.role
      FROM utilisateur u
      INNER JOIN messagerie m ON (u.id_user = m.id_expediteur OR u.id_user = m.id_destinataire)
      WHERE (m.id_expediteur = ? OR m.id_destinataire = ?) AND u.id_user != ?
      ORDER BY u.nom, u.prenom
    `, [req.user.id, req.user.id, req.user.id])

    res.json(conversations)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des conversations' })
  }
})

// Récupérer les messages avec un utilisateur
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const [messages] = await pool.query(`
      SELECT * FROM messagerie
      WHERE (id_expediteur = ? AND id_destinataire = ?)
         OR (id_expediteur = ? AND id_destinataire = ?)
      ORDER BY date_envoi ASC
    `, [req.user.id, req.params.userId, req.params.userId, req.user.id])

    res.json(messages)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' })
  }
})

// Envoyer un message
router.post('/', authenticateToken, async (req, res) => {
  const { id_destinataire, contenu } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO messagerie (id_expediteur, id_destinataire, contenu, date_envoi) VALUES (?, ?, ?, NOW())',
      [req.user.id, id_destinataire, contenu]
    )

    res.status(201).json({ 
      message: 'Message envoyé',
      messageId: result.insertId
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' })
  }
})

export default router
