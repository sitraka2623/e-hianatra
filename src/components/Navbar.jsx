import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import { FiMenu, FiX, FiUser, FiLogOut, FiMessageSquare, FiBook } from 'react-icons/fi'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'STUDENT': return '/student/dashboard'
      case 'TEACHER': return '/teacher/dashboard'
      case 'ADMIN': return '/admin/dashboard'
      default: return '/'
    }
  }

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 backdrop-blur-lg bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={getDashboardLink()} className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg group-hover:shadow-glow transition-all">
                <FiBook className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold gradient-text">e-Hianatra</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user && (
              <>
                <Link to="/courses" className="text-gray-700 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-all font-medium">
                  {t('nav.courses')}
                </Link>
                <Link to="/messages" className="text-gray-700 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-all font-medium flex items-center">
                  <FiMessageSquare className="mr-2" /> {t('nav.messages')}
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-all font-medium flex items-center">
                  <FiUser className="mr-2" /> {t('nav.profile')}
                </Link>
                <LanguageSwitcher />
                <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium flex items-center ml-2">
                  <FiLogOut className="mr-2" /> {t('nav.logout')}
                </button>
              </>
            )}
            {!user && <LanguageSwitcher />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && user && (
        <div className="md:hidden animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link to="/courses" className="block text-gray-700 hover:bg-white px-4 py-3 rounded-lg font-medium transition-colors">
              {t('nav.courses')}
            </Link>
            <Link to="/messages" className="block text-gray-700 hover:bg-white px-4 py-3 rounded-lg font-medium transition-colors">
              {t('nav.messages')}
            </Link>
            <Link to="/profile" className="block text-gray-700 hover:bg-white px-4 py-3 rounded-lg font-medium transition-colors">
              {t('nav.profile')}
            </Link>
            <button onClick={handleLogout} className="block w-full text-left text-red-500 hover:bg-white px-4 py-3 rounded-lg font-medium transition-colors">
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
