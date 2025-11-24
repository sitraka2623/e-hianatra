import express from 'express'
import pool from '../config/database.js'
import { authenticateToken, authorizeRoles } from '../middleware/auth.js'

const router = express.Router()

// Récupérer tous les cours
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, u.nom as enseignant_nom, u.prenom as enseignant_prenom,
             COUNT(DISTINCT i.id_user) as studentCount
      FROM cours c
      LEFT JOIN utilisateur u ON c.id_enseignant = u.id_user
      LEFT JOIN inscriptions i ON c.id_cours = i.id_cours
      GROUP BY c.id_cours
      ORDER BY c.id_cours DESC
    `)
    res.json(courses)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des cours' })
  }
})

// Récupérer un cours par ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, u.nom as enseignant_nom, u.prenom as enseignant_prenom
      FROM cours c
      LEFT JOIN utilisateur u ON c.id_enseignant = u.id_user
      WHERE c.id_cours = ?
    `, [req.params.id])

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Cours non trouvé' })
    }

    res.json(courses[0])
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du cours' })
  }
})

// Créer un cours (enseignant uniquement)
router.post('/', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), async (req, res) => {
  const { titre, description, categorie } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO cours (titre, description, categorie, id_enseignant) VALUES (?, ?, ?, ?)',
      [titre, description, categorie, req.user.id]
    )

    res.status(201).json({ 
      message: 'Cours créé avec succès',
      courseId: result.insertId
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la création du cours' })
  }
})

// S'inscrire à un cours
router.post('/:id/enroll', authenticateToken, authorizeRoles('STUDENT'), async (req, res) => {
  try {
    // Vérifier si déjà inscrit
    const [existing] = await pool.query(
      'SELECT * FROM inscriptions WHERE id_cours = ? AND id_user = ?',
      [req.params.id, req.user.id]
    )

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Vous êtes déjà inscrit à ce cours' })
    }

    await pool.query(
      'INSERT INTO inscriptions (id_cours, id_user, date_inscription) VALUES (?, ?, NOW())',
      [req.params.id, req.user.id]
    )

    res.json({ message: 'Inscription réussie' })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de l\'inscription' })
  }
})

// Récupérer les chapitres d'un cours
router.get('/:id/chapters', authenticateToken, async (req, res) => {
  try {
    const [chapters] = await pool.query(
      'SELECT * FROM chapitre WHERE id_cours = ? ORDER BY ordre, id_chapitre',
      [req.params.id]
    )
    res.json(chapters)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des chapitres' })
  }
})

// Créer un chapitre (enseignant uniquement)
router.post('/:id/chapters', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), async (req, res) => {
  const { titre, description, ordre } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO chapitre (titre, description, ordre, id_cours) VALUES (?, ?, ?, ?)',
      [titre, description, ordre || 0, req.params.id]
    )

    res.status(201).json({ 
      message: 'Chapitre créé avec succès',
      chapterId: result.insertId
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la création du chapitre' })
  }
})

// Récupérer les quiz d'un cours
router.get('/:id/quizzes', authenticateToken, async (req, res) => {
  try {
    const [quizzes] = await pool.query(
      'SELECT * FROM quiz WHERE id_cours = ? ORDER BY id_quiz',
      [req.params.id]
    )
    res.json(quizzes)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des quiz' })
  }
})

// Récupérer les devoirs d'un cours
router.get('/:id/assignments', authenticateToken, async (req, res) => {
  try {
    const [assignments] = await pool.query(
      'SELECT * FROM devoirs WHERE id_cours = ? ORDER BY date_limite DESC',
      [req.params.id]
    )
    res.json(assignments)
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des devoirs' })
  }
})

// Modifier un cours (enseignant uniquement)
router.put('/:id', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), async (req, res) => {
  const { titre, description, categorie } = req.body

  try {
    // Vérifier que le cours appartient à l'enseignant
    const [courses] = await pool.query(
      'SELECT * FROM cours WHERE id_cours = ? AND id_enseignant = ?',
      [req.params.id, req.user.id]
    )

    if (courses.length === 0) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier ce cours' })
    }

    await pool.query(
      'UPDATE cours SET titre = ?, description = ?, categorie = ? WHERE id_cours = ?',
      [titre, description, categorie, req.params.id]
    )

    res.json({ message: 'Cours modifié avec succès' })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la modification du cours' })
  }
})

// Supprimer un cours (enseignant uniquement)
router.delete('/:id', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), async (req, res) => {
  try {
    // Vérifier que le cours appartient à l'enseignant
    const [courses] = await pool.query(
      'SELECT * FROM cours WHERE id_cours = ? AND id_enseignant = ?',
      [req.params.id, req.user.id]
    )

    if (courses.length === 0) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer ce cours' })
    }

    // Supprimer les données liées (en cascade)
    await pool.query('DELETE FROM soumissions_devoirs WHERE id_devoir IN (SELECT id_devoir FROM devoirs WHERE id_cours = ?)', [req.params.id])
    await pool.query('DELETE FROM devoirs WHERE id_cours = ?', [req.params.id])
    await pool.query('DELETE FROM reponses_quiz WHERE id_quiz IN (SELECT id_quiz FROM quiz WHERE id_cours = ?)', [req.params.id])
    await pool.query('DELETE FROM questions_quiz WHERE id_quiz IN (SELECT id_quiz FROM quiz WHERE id_cours = ?)', [req.params.id])
    await pool.query('DELETE FROM quiz WHERE id_cours = ?', [req.params.id])
    await pool.query('DELETE FROM chapitre WHERE id_cours = ?', [req.params.id])
    await pool.query('DELETE FROM inscriptions WHERE id_cours = ?', [req.params.id])
    await pool.query('DELETE FROM cours WHERE id_cours = ?', [req.params.id])

    res.json({ message: 'Cours supprimé avec succès' })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la suppression du cours' })
  }
})

export default router
