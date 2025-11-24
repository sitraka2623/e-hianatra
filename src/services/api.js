import axios from 'axios'
import {
  mockCourses,
  mockChapters,
  mockContents,
  mockQuizzes,
  mockQuestions,
  mockAssignments,
  mockMessages,
  mockConversations,
  mockStats,
  mockUser,
  delay
} from '../data/mockData'

// Mode démo : true = utilise les données mock, false = utilise l'API réelle
const DEMO_MODE = false  // 🔌 Backend réel activé

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour simuler les réponses en mode démo
api.interceptors.response.use(
  (response) => {
    // ✅ Succès : données du backend réel
    console.log('✅ Données du backend:', response.config.url)
    return response
  },
  async (error) => {
    // Mode démo activé : retourne des données mock en cas d'erreur
    if (DEMO_MODE) {
      const { config } = error
      const url = config.url
      
      console.log('🎮 Mode démo - Données mock pour:', url)
      await delay(300) // Simule un délai réseau

      // Simuler les réponses selon l'URL
      if (url === '/courses') {
        return { data: mockCourses }
      }
      if (url.match(/\/courses\/\d+$/)) {
        const id = parseInt(url.split('/').pop())
        return { data: mockCourses.find(c => c.id_cours === id) || mockCourses[0] }
      }
      if (url.match(/\/courses\/\d+\/chapters/)) {
        return { data: mockChapters }
      }
      if (url.match(/\/courses\/\d+\/quizzes/)) {
        return { data: mockQuizzes }
      }
      if (url.match(/\/courses\/\d+\/assignments/)) {
        return { data: mockAssignments }
      }
      if (url.match(/\/chapters\/\d+$/)) {
        return { data: mockChapters[0] }
      }
      if (url.match(/\/chapters\/\d+\/contents/)) {
        return { data: mockContents }
      }
      if (url.match(/\/quiz\/\d+$/)) {
        return { data: mockQuizzes[0] }
      }
      if (url.match(/\/quiz\/\d+\/questions/)) {
        return { data: mockQuestions }
      }
      if (url.match(/\/assignments\/\d+$/)) {
        return { data: mockAssignments[0] }
      }
      if (url === '/student/dashboard') {
        return { 
          data: { 
            courses: mockCourses.slice(0, 3),
            stats: mockStats.student
          }
        }
      }
      if (url === '/teacher/dashboard') {
        return { 
          data: { 
            courses: mockCourses.slice(0, 3),
            stats: mockStats.teacher
          }
        }
      }
      if (url === '/admin/dashboard') {
        return { 
          data: { 
            stats: mockStats.admin
          }
        }
      }
      if (url === '/messages/conversations') {
        return { data: mockConversations }
      }
      if (url.match(/\/messages\/\d+/)) {
        return { data: mockMessages }
      }
      if (url === '/profile') {
        return { data: mockUser }
      }
    }
    
    // Mode backend réel : affiche l'erreur
    console.error('❌ Erreur backend:', error.message)
    console.error('💡 Vérifiez que le backend est lancé sur http://localhost:8080')
    return Promise.reject(error)
  }
)

export default api
