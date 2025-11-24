import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { FiBook, FiUser } from 'react-icons/fi'

const CourseCard = ({ course }) => {
  const { t } = useLanguage()
  
  return (
    <Link to={`/courses/${course.id_cours}`} className="block group">
      <div className="bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
        <div className="h-48 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
          <FiBook className="text-white text-6xl relative z-10 group-hover:scale-110 transition-transform" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
            {course.titre}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 px-4 py-2 rounded-full">
              {course.categorie}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <FiUser className="mr-1" />
              <span>{t('common.teacher')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
