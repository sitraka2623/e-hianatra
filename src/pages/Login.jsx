import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { FiMail, FiLock, FiBook } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(email, password)
      
      // Redirection selon le rôle
      switch (user.role) {
        case 'STUDENT':
          navigate('/student/dashboard')
          break
        case 'TEACHER':
          navigate('/teacher/dashboard')
          break
        case 'ADMIN':
          navigate('/admin/dashboard')
          break
        default:
          navigate('/')
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative z-10 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-2xl mb-4">
            <FiBook className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">e-Hianatra</h1>
          <p className="text-gray-600">{t('auth.loginTitle')}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 animate-fadeIn">
            {t('auth.loginError')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {t('auth.email')}
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? '...' : t('auth.login')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold hover:underline">
              {t('auth.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
