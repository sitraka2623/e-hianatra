import express from 'express'
import pool from '../config/database.js'
import { authenticateToken, authorizeRoles } from '../middleware/auth.js'

const router = express.Router()

// Dashboard Étudiant
router.get('/student/dashboard', authenticateToken, authorizeRoles('STUDENT'), async (req, res) => {
  try {
    // Cours inscrits
    const [enrolledCourses] = await pool.query(`
      SELECT c.*, 
             (SELECT COUNT(*) FROM chapitre WHERE id_cours = c.id_cours) as totalChapters
      FROM cours c
      INNER JOIN inscription i ON c.id_cours = i.id_cours
      WHERE i.id_etudiant = ?
      ORDER BY i.date_inscription DESC
    `, [req.user.id])

    // Statistiques
    const [stats] = await pool.query(`
      SELECT 
        COUNT(DISTINCT i.id_cours) as enrolledCourses,
        0 as completedCourses,
        COUNT(DISTINCT i.id_cours) as inProgressCourses
      FROM inscription i
      WHERE i.id_etudiant = ?
    `, [req.user.id])

    res.json({
      courses: enrolledCourses,
      stats: {
        ...stats[0],
        totalProgress: 37
      }
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du dashboard' })
  }
})

// Dashboard Enseignant
router.get('/teacher/dashboard', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
  try {
    // Cours créés
    const [courses] = await pool.query(`
      SELECT c.*,
             COUNT(DISTINCT i.id_etudiant) as studentCount
      FROM cours c
      LEFT JOIN inscription i ON c.id_cours = i.id_cours
      WHERE c.id_enseignant = ?
      GROUP BY c.id_cours
      ORDER BY c.id_cours DESC
    `, [req.user.id])

    // Statistiques
    const [totalStudents] = await pool.query(`
      SELECT COUNT(DISTINCT i.id_etudiant) as total
      FROM inscription i
      INNER JOIN cours c ON i.id_cours = c.id_cours
      WHERE c.id_enseignant = ?
    `, [req.user.id])

    const [pendingAssignments] = await pool.query(`
      SELECT COUNT(*) as total
      FROM soumission s
      INNER JOIN devoir d ON s.id_devoir = d.id_devoir
      INNER JOIN cours c ON d.id_cours = c.id_cours
      WHERE c.id_enseignant = ? AND s.note IS NULL
    `, [req.user.id])

    res.json({
      courses,
      stats: {
        totalCourses: courses.length,
        totalStudents: totalStudents[0].total,
        pendingAssignments: pendingAssignments[0].total
      }
    })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du dashboard' })
  }
})

// Dashboard Admin
router.get('/admin/dashboard', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM utilisateur) as totalUsers,
        (SELECT COUNT(*) FROM cours) as totalCourses,
        (SELECT COUNT(*) FROM utilisateur WHERE role = 'STUDENT') as totalStudents,
        (SELECT COUNT(*) FROM utilisateur WHERE role = 'TEACHER') as totalTeachers
    `)

    res.json({ stats: stats[0] })
  } catch (error) {
    console.error('Erreur:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du dashboard' })
  }
})

export default router
