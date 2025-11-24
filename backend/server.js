import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import courseRoutes from './routes/courses.js'
import chapterRoutes from './routes/chapters.js'
import quizRoutes from './routes/quiz.js'
import assignmentRoutes from './routes/assignments.js'
import messageRoutes from './routes/messages.js'
import userRoutes from './routes/users.js'
import dashboardRoutes from './routes/dashboard.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/chapters', chapterRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api', userRoutes)
app.use('/api', dashboardRoutes)

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'e-Hianatra API is running',
    timestamp: new Date().toISOString()
  })
})

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' })
})

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Erreur serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur e-Hianatra démarré sur le port ${PORT}`)
  console.log(`📚 API disponible sur http://localhost:${PORT}/api`)
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`)
})
