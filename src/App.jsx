import { useState } from 'react'
import { ConfigProvider } from 'antd'
import Header from './components/Header'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import SignInModal from './components/SignInModal'
import Portal from './components/Portal'
import OnboardingFlow from './components/OnboardingFlow'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnboardingMode, setIsOnboardingMode] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  const handleOnboardingComplete = (data) => {
    setUserProfile(data)
    setIsOnboardingMode(false)
    setIsLoggedIn(true)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Inter', sans-serif",
          colorPrimary: '#A3B18A',
          borderRadius: 24,
        },
      }}
    >
      <div className="min-h-screen flex flex-col font-sans">
        {isOnboardingMode ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        ) : isLoggedIn ? (
          <Portal userProfile={userProfile} />
        ) : (
          <>
            <Header onSignInClick={() => setIsModalOpen(true)} />

            <main className="flex-grow">
              <Hero onStartClick={() => setIsOnboardingMode(true)} />
              <Pillars />
            </main>

            {/* Simple Footer */}
            <footer className="bg-slate-50 py-12 text-center border-t border-slate-100 mt-auto">
              <p className="text-slate-500 font-medium">© 2026 Mama Circle. All rights reserved.</p>
            </footer>

            <SignInModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onLoginSuccess={() => { setIsLoggedIn(true); setIsModalOpen(false); }}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  )
}

export default App
