import React, { useState } from 'react'
import { FiInfo, FiX } from 'react-icons/fi'

const DemoNotice = () => {
  const [isVisible, setIsVisible] = useState(false)  // 🔌 Masqué en mode backend

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <FiInfo className="text-2xl mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">Mode Démonstration</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Vous utilisez des données de test. Connectez-vous avec n'importe quel email pour explorer l'interface.
              </p>
              <div className="mt-3 space-y-1 text-xs opacity-80">
                <p>📧 <strong>Étudiant:</strong> student@demo.mg</p>
                <p>👨‍🏫 <strong>Enseignant:</strong> teacher@demo.mg</p>
                <p>⚙️ <strong>Admin:</strong> admin@demo.mg</p>
                <p className="mt-2">🔑 Mot de passe: n'importe lequel</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors ml-2"
          >
            <FiX />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DemoNotice
