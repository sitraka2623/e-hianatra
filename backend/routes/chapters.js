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

// Récupérer les contenus d'un chapitre
router.get('/:id/contents', authenticateToken, async (req, res) => {
  try {
    const [contents] = await pool.query(
      'SELECT * FROM contenu WHERE id_chapitre = ? ORDER BY id_contenu',
      [req.params.id]
    )
    
    // Parser les JSON pour les contenus de type GUIDE
    const parsedContents = contents.map(content => {
      if (content.type === 'GUIDE') {
        return {
          ...content,
          logiciels: content.logiciels ? JSON.parse(content.logiciels) : [],
          etapes: content.etapes ? JSON.parse(content.etapes) : []
        }
      }
      return content
    })
    
    res.json(parsedContents)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des contenus' })
  }
})

// Créer un contenu pour un chapitre
router.post('/:id/contents', authenticateToken, async (req, res) => {
  const { type, titre, url, logiciels, etapes } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO contenu (type, titre, url, logiciels, etapes, id_chapitre) VALUES (?, ?, ?, ?, ?, ?)',
      [type, titre, url || null, logiciels || null, etapes || null, req.params.id]
    )

    res.status(201).json({ 
      message: 'Contenu créé avec succès',
      contentId: result.insertId
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la création du contenu' })
  }
})

export default router
