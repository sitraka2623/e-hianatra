import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { FiGlobe } from 'react-icons/fi'

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage()

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ]

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <FiGlobe className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
              language === lang.code ? 'bg-primary/5 text-primary' : 'text-gray-700'
            } ${lang.code === 'fr' ? 'rounded-t-lg' : ''} ${lang.code === 'en' ? 'rounded-b-lg' : ''}`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
