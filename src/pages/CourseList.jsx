import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import api from '../services/api'
import { FiSearch } from 'react-icons/fi'

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [searchTerm, selectedCategory, courses])

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses')
      setCourses(response.data)
      
      const uniqueCategories = [...new Set(response.data.map(c => c.categorie))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Erreur lors du chargement des cours')
    }
  }

  const filterCourses = () => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.categorie === selectedCategory)
    }

    setFilteredCourses(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Catalogue de cours</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun cours trouvé</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id_cours} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseList
