import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { FiDownload, FiFileText, FiCheckCircle } from 'react-icons/fi'

const ChapterView = () => {
  const { id } = useParams()
  const [chapter, setChapter] = useState(null)
  const [contents, setContents] = useState([])

  useEffect(() => {
    fetchChapterData()
  }, [id])

  const fetchChapterData = async () => {
    try {
      const [chapterRes, contentsRes] = await Promise.all([
        api.get(`/chapters/${id}`),
        api.get(`/chapters/${id}/contents`)
      ])
      setChapter(chapterRes.data)
      setContents(contentsRes.data)
    } catch (error) {
      console.error('Erreur lors du chargement du chapitre')
    }
  }

  if (!chapter) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{chapter.titre}</h1>
          <p className="text-gray-600 text-lg">{chapter.description}</p>
        </div>

        {/* Contents */}
        <div className="space-y-8">
          {contents.map(content => (
            <div key={content.id_contenu} className="border-2 border-gray-200 rounded-2xl p-8 bg-white shadow-soft">
              {/* Guide étape par étape */}
              {content.type === 'GUIDE' && (
                <div>
                  {/* En-tête du guide */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{content.titre}</h3>
                    
                    {/* Logiciels requis */}
                    {content.logiciels && content.logiciels.length > 0 && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <FiDownload className="mr-2" /> Logiciels Requis
                        </h4>
                        <ul className="space-y-1">
                          {content.logiciels.map((logiciel, idx) => (
                            <li key={idx} className="text-blue-800 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {logiciel}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Étapes du guide */}
                  {content.etapes && content.etapes.length > 0 && (
                    <div className="space-y-6">
                      {content.etapes.map((etape) => (
                        <div key={etape.numero} className="relative pl-12 pb-8 border-l-2 border-primary-200 last:border-l-0 last:pb-0">
                          {/* Numéro de l'étape */}
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {etape.numero}
                          </div>

                          {/* Contenu de l'étape */}
                          <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                            <h4 className="text-lg font-bold text-gray-800 mb-3">{etape.titre}</h4>
                            <p className="text-gray-700 mb-3 leading-relaxed">{etape.description}</p>
                            
                            {/* Détails supplémentaires */}
                            {etape.details && (
                              <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg">
                                <div className="text-sm text-gray-700">
                                  {etape.details.split('\n').map((line, idx) => {
                                    // Détection de code (lignes qui commencent par des espaces ou contiennent des symboles de code)
                                    const isCode = line.trim().match(/^[a-z_]+\s*=|^print\(|^#|^def |^class |^import |^from /)
                                    
                                    if (isCode) {
                                      return (
                                        <pre key={idx} className="bg-gray-900 text-green-400 p-2 rounded my-1 overflow-x-auto font-mono text-xs">
                                          <code>{line}</code>
                                        </pre>
                                      )
                                    }
                                    
                                    // Ligne normale
                                    return line.trim() ? (
                                      <p key={idx} className="my-1 leading-relaxed whitespace-pre-wrap">
                                        {line}
                                      </p>
                                    ) : (
                                      <br key={idx} />
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pied du guide */}
                  <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                    <p className="text-green-800 font-semibold flex items-center">
                      <FiCheckCircle className="text-2xl mr-2" />
                      Félicitations ! Vous avez terminé ce guide.
                    </p>
                    <p className="text-green-700 text-sm mt-2">
                      Passez au guide suivant pour continuer votre apprentissage.
                    </p>
                  </div>
                </div>
              )}

              {/* Document PDF */}
              {content.type === 'PDF' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FiFileText className="text-primary text-2xl mr-2" />
                      <h3 className="text-xl font-semibold">Document PDF</h3>
                    </div>
                    <a
                      href={content.url}
                      download
                      className="flex items-center text-primary hover:underline"
                    >
                      <FiDownload className="mr-1" /> Télécharger
                    </a>
                  </div>
                  <iframe
                    src={content.url}
                    className="w-full h-96 border rounded-lg"
                    title="PDF Viewer"
                  />
                </div>
              )}

              {/* Texte simple */}
              {content.type === 'TEXT' && (
                <div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">{content.url}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChapterView
