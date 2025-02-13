'use client' // This directive marks the component as a Client Component

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GenericResponse } from '@/models/response/GenericResponse'
import { LoginResponse } from '@/models/response/LoginResponse'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import { Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function LoginPage() {
    const t = useTranslations('feedback')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { login: authLogin } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch(
                'https://wp-api.gluttongk.com/api/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ login, password }),
                }
            )

            const data =
                (await response.json()) as GenericResponse<LoginResponse>

            if (response.ok && data.data?.token) {
                authLogin(data.data.token)
                router.push('/')
            } else {
                setError(data.message || 'Login failed')
            }
        } catch (err) {
            setError('An error occurred during login')
        }
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <div className='flex flex-1 items-center justify-center'>
                <div className='rounded-lg px-8 py-6 w-full max-w-lg'>
                    <h3 className='text-center text-2xl font-bold text-slate-950 dark:text-slate-50'>
                        Login to your account
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-8'>
                            <div>
                                <label className='block' htmlFor='login'>
                                    Username or Email
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Username or Email'
                                    className='mt-2 w-full rounded-md border px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-hidden'
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label className='block' htmlFor='password'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    placeholder='Enter Password'
                                    className='mt-2 w-full rounded-md border px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-hidden'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={'mt-2 flex justify-between'}>
                                <Link
                                    href={'/register'}
                                    className={
                                        'text-sky-500 hover:underline dark:text-cyan-300'
                                    }
                                >
                                    Don't have an account? Register now
                                </Link>
                                <Link
                                    href={'/forgot-password'}
                                    className={
                                        'text-sky-500 hover:underline dark:text-cyan-300'
                                    }
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className='mt-6 flex items-baseline justify-between'>
                                <Button
                                    variant='default'
                                    radius='lg'
                                    onClick={handleBack}
                                >
                                    <Undo2 />
                                    {t('back')}
                                </Button>
                                <Button variant={'default'} radius={'lg'}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                    {error && <p className='mt-4 text-red-500'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
