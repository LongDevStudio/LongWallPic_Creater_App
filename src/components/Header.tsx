'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="p-4 bg-gradient-to-r from-purple-600 to-blue-600">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-white">
          WallpaperWizard
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={() => router.push('/upload')}
              >
                Upload
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={() => router.push('/works')}
              >
                My Works
              </Button>
              <Button
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-white/90"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
