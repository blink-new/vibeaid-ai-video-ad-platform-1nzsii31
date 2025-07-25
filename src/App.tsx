import { useEffect, useState } from 'react'
import { blink } from './blink/client'
import { CometBackground } from './components/CometBackground'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { ChatBot } from './components/ChatBot'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold">V</span>
          </div>
          <p className="text-gray-400">Loading VibeAd...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Animated Comet Background */}
      <CometBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
      </div>

      {/* Corner Chatbot */}
      <ChatBot />
    </div>
  )
}

export default App