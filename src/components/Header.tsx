'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LanguageSelector } from './LanguageSelector'
import { ThemeSelector } from './ThemeSelector'
import { useTranslations } from 'next-intl'

export function Header() {
    const t = useTranslations()
    const { isLoggedIn, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <header className='w-full bg-linear-to-r from-amber-50 to-cyan-50 p-4 dark:from-indigo-900 dark:to-fuchsia-900'>
            <nav className='mx-auto flex max-w-7xl items-center justify-between'>
                <Link
                    href='/'
                    className='text-2xl font-bold text-slate-950 dark:text-slate-50'
                >
                    SA! Wallpaper
                </Link>

                <div className='flex items-center gap-4'>
                    {isLoggedIn ? (
                        <>
                            <Button
                                radius={'lg'}
                                className='bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
                                onClick={() => router.push('/upload')}
                            >
                                Upload Work
                            </Button>
                            <Button
                                variant='ghost'
                                radius={'lg'}
                                className='bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
                                onClick={() => router.push('/works')}
                            >
                                My Works
                            </Button>
                            <Button
                                radius={'lg'}
                                className='bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button
                            radius='lg'
                            className='bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
                            onClick={() => router.push('/login')}
                        >
                            Login
                        </Button>
                    )}
                </div>
                <div className='absolute right-4 flex items-center gap-4'>
                    <LanguageSelector />
                    <ThemeSelector radius='full' />
                </div>
            </nav>
        </header>
    )
}
