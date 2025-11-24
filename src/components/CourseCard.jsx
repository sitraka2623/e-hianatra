import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { FiBook, FiUser } from 'react-icons/fi'

const CourseCard = ({ course }) => {
  const { t } = useLanguage()
  
  // Images selon la catégorie
  const getCategoryImage = (categorie) => {
    const images = {
      'Programmation': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      'Développement Web': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      'Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'Base de Données': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
      'Intelligence Artificielle': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      'IA': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      'Cybersécurité': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      'Mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'DevOps': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80'
    }
    return images[categorie] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
  }
  
  return (
    <Link to={`/courses/${course.id_cours}`} className="block group">
      <div className="bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
        <div className="h-48 relative overflow-hidden">
          <img 
            src={getCategoryImage(course.categorie)} 
            alt={course.titre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full">
              {course.categorie}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
            {course.titre}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <FiUser className="mr-1" />
            <span>{t('common.teacher')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
