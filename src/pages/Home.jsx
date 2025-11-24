import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import VideoBackground from '../components/VideoBackground'
import { FiBook, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'

const Home = () => {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative text-white overflow-hidden min-h-screen flex items-center">
        {/* Video Background Component */}
        <VideoBackground />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-secondary-900/90"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center w-full animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-2xl px-2">
              {t('home.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-medium opacity-95 drop-shadow-lg px-4">
              {t('home.subtitle')}
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed drop-shadow-lg px-4">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg"
              >
                {t('home.startFree')}
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-primary-600 transition-all duration-300 text-base sm:text-lg backdrop-blur-sm"
              >
                {t('home.login')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-gray-900 px-4">
            {t('home.whyChoose')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <FiBook className="text-primary-600 text-3xl sm:text-4xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{t('home.features.courses.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.features.courses.desc')}</p>
            </div>
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-100 to-green-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <FiUsers className="text-green-600 text-3xl sm:text-4xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{t('home.features.teachers.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.features.teachers.desc')}</p>
            </div>
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <FiAward className="text-yellow-600 text-3xl sm:text-4xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{t('home.features.certificates.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.features.certificates.desc')}</p>
            </div>
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <FiTrendingUp className="text-purple-600 text-3xl sm:text-4xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{t('home.features.progress.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('home.features.progress.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">{t('home.cta.title')}</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 opacity-95">{t('home.cta.subtitle')}</p>
          <Link
            to="/register"
            className="bg-white text-primary-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block text-base sm:text-lg"
          >
            {t('home.cta.button')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
