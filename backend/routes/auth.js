import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import pool from '../config/database.js'

const router = express.Router()

// Inscription
router.post('/register', [
  body('email').isEmail().withMessage('Email invalide'),
  body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('role').isIn(['STUDENT', 'TEACHER', 'ADMIN']).withMessage('Rôle invalide')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { nom, prenom, email, mot_de_passe, role } = req.body

  try {
    // Vérifier si l'utilisateur existe déjà
    const [existingUser] = await pool.query(
      'SELECT * FROM utilisateur WHERE email = ?',
      [email]
    )

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' })
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10)

    // Insérer l'utilisateur
    const [result] = await pool.query(
      'INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, hashedPassword, role]
    )

    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      userId: result.insertId
    })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    res.status(500).json({ error: 'Erreur lors de l\'inscription' })
  }
})

// Connexion
router.post('/login', [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    // Récupérer l'utilisateur
    const [users] = await pool.query(
      'SELECT * FROM utilisateur WHERE email = ?',
      [email]
    )

    if (users.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }

    const user = users[0]

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }

    // Générer le token JWT
    const token = jwt.sign(
      { 
        id: user.id_user,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({ 
      token,
      user: {
        id: user.id_user,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    res.status(500).json({ error: 'Erreur lors de la connexion' })
  }
})

export default router
