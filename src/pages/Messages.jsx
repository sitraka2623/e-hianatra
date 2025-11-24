import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { FiSend, FiUser } from 'react-icons/fi'

const Messages = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation)
    }
  }, [selectedConversation])

  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/conversations')
      setConversations(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des conversations')
    }
  }

  const fetchMessages = async (userId) => {
    try {
      const response = await api.get(`/messages/${userId}`)
      setMessages(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des messages')
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await api.post('/messages', {
        id_destinataire: selectedConversation,
        contenu: newMessage
      })
      setNewMessage('')
      fetchMessages(selectedConversation)
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Messagerie</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Aucune conversation
                </div>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.id_user}
                    onClick={() => setSelectedConversation(conv.id_user)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conv.id_user ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-300 rounded-full p-2 mr-3">
                        <FiUser className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{conv.nom} {conv.prenom}</h3>
                        <p className="text-sm text-gray-500">{conv.role}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                      <div
                        key={msg.id_message}
                        className={`flex ${msg.id_expediteur === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.id_expediteur === user.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          <p>{msg.contenu}</p>
                          <p className="text-xs mt-1 opacity-75">
                            {new Date(msg.date_envoi).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="border-t p-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
                      >
                        <FiSend />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Sélectionnez une conversation
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
