import { useEffect, useState } from 'react'
import { blink } from './blink/client'
import { CometBackground } from './components/CometBackground'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { ChatBot } from './components/ChatBot'
import Dashboard from './pages/Dashboard'
import URLCloner from './pages/URLCloner'

type Page = 'landing' | 'dashboard' | 'url-cloner' | 'video-builder' | 'analytics' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      // Auto-navigate to dashboard if user is authenticated
      if (state.user && currentPage === 'landing') {
        setCurrentPage('dashboard')
      }
    })
    return unsubscribe
  }, [currentPage])

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard')
    } else {
      blink.auth.login()
    }
  }

  const handleCloneURL = () => {
    if (user) {
      setCurrentPage('url-cloner')
    } else {
      blink.auth.login()
    }
  }

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

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />
      case 'url-cloner':
        return <URLCloner onBack={() => setCurrentPage('dashboard')} />
      case 'video-builder':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Video Builder</h2>
              <p className="text-gray-400 mb-6">Coming soon...</p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <p className="text-gray-400 mb-6">Coming soon...</p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-400 mb-6">Coming soon...</p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )
      default:
        return (
          <div className="min-h-screen bg-black text-white relative">
            {/* Animated Comet Background */}
            <CometBackground />
            
            {/* Main Content */}
            <div className="relative z-10">
              <Navigation 
                user={user}
                onNavigate={handleNavigate}
              />
              <Hero 
                onGetStarted={handleGetStarted}
                onCloneURL={handleCloneURL}
              />
            </div>

            {/* Corner Chatbot */}
            <ChatBot />
          </div>
        )
    }
  }

  return renderPage()
}

export default App