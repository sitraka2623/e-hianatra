import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Récupérer un chapitre par ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [chapters] = await pool.query(
      'SELECT * FROM chapitre WHERE id_chapitre = ?',
      [req.params.id]
    )

    if (chapters.length === 0) {
      return res.status(404).json({ error: 'Chapitre non trouvé' })
    }

    res.json(chapters[0])
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du chapitre' })
  }
})

// Récupérer le contenu d'un chapitre (stocké dans la colonne contenu)
router.get('/:id/contents', authenticateToken, async (req, res) => {
  try {
    const [chapters] = await pool.query(
      'SELECT contenu FROM chapitre WHERE id_chapitre = ?',
      [req.params.id]
    )
    
    if (chapters.length === 0) {
      return res.status(404).json({ error: 'Chapitre non trouvé' })
    }
    
    // Le contenu est stocké en JSON dans la colonne contenu
    const content = chapters[0].contenu ? JSON.parse(chapters[0].contenu) : []
    res.json(content)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du contenu' })
  }
})

// Mettre à jour le contenu d'un chapitre
router.put('/:id/contents', authenticateToken, async (req, res) => {
  const { contenu } = req.body

  try {
    await pool.query(
      'UPDATE chapitre SET contenu = ? WHERE id_chapitre = ?',
      [JSON.stringify(contenu), req.params.id]
    )

    res.json({ message: 'Contenu mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour du contenu' })
  }
})

export default router
