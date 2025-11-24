import React, { useState, useEffect } from 'react'

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    console.log('✅ Vidéo chargée avec succès')
  }

  const handleVideoError = (e) => {
    setVideoError(true)
    console.error('❌ Erreur de chargement de la vidéo:', e)
  }

  useEffect(() => {
    console.log('🎥 Tentative de chargement de la vidéo...')
  }, [])

  return (
    <>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1s' }}
      >
        <source 
          src="https://cdn.coverr.co/videos/coverr-students-studying-in-library-6324/1080p.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Fallback Background si la vidéo ne charge pas */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600">
          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-sm opacity-50">Chargement de la vidéo...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default VideoBackground
