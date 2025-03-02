'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Mail, Undo2, RefreshCw, KeyRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { verifyResetCode, resetPassword } from '@/app/actions/password-reset'

interface EmailStepProps {
    email: string
    setEmail: (email: string) => void
    handleEmailSubmit: (e: React.FormEvent) => Promise<void>
    handleBack: () => void
    isSubmitting: boolean
    cooldownTime: number
    isVerificationSent: boolean
}

const EmailStep: React.FC<EmailStepProps> = ({
    email,
    setEmail,
    handleEmailSubmit,
    handleBack,
    isSubmitting,
    cooldownTime,
    isVerificationSent,
}) => {
    return (
        <>
            <h3 className='text-center text-2xl font-bold text-slate-950 dark:text-slate-50'>
                Step 1: Enter Email
            </h3>
            <p className='mt-4 text-center text-slate-950 dark:text-slate-50'>
                {`We'll send a code to `}
                {email ? (
                    <span className='text-sky-500 dark:text-cyan-300'>
                        {email}
                    </span>
                ) : (
                    'your email'
                )}
                {` to verify your account`}
            </p>
            <form onSubmit={handleEmailSubmit}>
                <div className='mt-8'>
                    <div>
                        <label className='block' htmlFor='email'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            className='mt-2 w-full rounded-md border px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-hidden'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-6 flex items-baseline justify-between'>
                        <Button
                            variant='default'
                            radius='lg'
                            onClick={handleBack}
                            type='button'
                        >
                            <Undo2 />
                            Back
                        </Button>
                        <Button
                            variant='default'
                            radius='lg'
                            type='submit'
                            className={
                                isSubmitting || (isVerificationSent && cooldownTime > 0)
                                    ? 'hover:cursor-progress'
                                    : !email.trim()
                                    ? 'opacity-50'
                                    : 'hover:cursor-pointer'
                            }
                            disabled={isSubmitting || !email.trim() || (isVerificationSent && cooldownTime > 0)}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className='mr-3 h-5 w-5 animate-ping text-slate-50 dark:text-slate-950'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        />
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 0116 0 8 8 0 01-16 0z'
                                        />
                                    </svg>
                                    Sending...
                                </>
                            ) : isVerificationSent && cooldownTime > 0 ? (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Resend in {cooldownTime}s
                                </>
                            ) : (
                                <>
                                    <Mail />
                                    Send Reset Code
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

interface VerificationStepProps {
    email: string
    verificationCode: string[]
    handleCodeChange: (index: number, value: string) => void
    handleVerificationSubmit: (e: React.FormEvent) => Promise<void>
    handleBack: () => void
    handleResendCode: () => Promise<void>
    handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void
    cooldownTime: number
    isResending: boolean
}

const VerificationStep: React.FC<VerificationStepProps> = ({
    email,
    verificationCode,
    handleCodeChange,
    handleVerificationSubmit,
    handleBack,
    handleResendCode,
    handleKeyDown,
    handlePaste,
    cooldownTime,
    isResending,
}) => {
    return (
        <>
            <h3 className='text-center text-2xl font-bold text-slate-950 dark:text-slate-50'>
                Step 2: Verify Email
            </h3>
            <p className='mt-4 text-center text-slate-950 dark:text-slate-50'>
                Enter the verification code sent to{' '}
                <span className='text-sky-500 dark:text-cyan-300'>{email}</span>
            </p>
            <form onSubmit={handleVerificationSubmit}>
                <div className='mt-8'>
                    <div className='flex justify-center space-x-2'>
                        {verificationCode.map((digit, index) => (
                            <input
                                key={index}
                                type='text'
                                id={`code-${index}`}
                                className='h-12 w-12 rounded-md border text-center text-lg'
                                maxLength={1}
                                value={digit}
                                onChange={e =>
                                    handleCodeChange(index, e.target.value)
                                }
                                pattern='[0-9]'
                                onKeyDown={e => handleKeyDown(index, e)}
                                onPaste={e => handlePaste(e, index)}
                            />
                        ))}
                    </div>
                    <div className='mt-6 flex items-baseline justify-between'>
                        <Button
                            variant='default'
                            radius='lg'
                            onClick={handleBack}
                            type='button'
                        >
                            <Undo2 />
                            Back
                        </Button>
                        <div className='flex items-center'>
                            <Button
                                variant='default'
                                radius={'lg'}
                                onClick={handleResendCode}
                                disabled={cooldownTime > 0 || isResending}
                                className='mr-2 text-sm'
                            >
                                {isResending ? (
                                    <>
                                        <svg
                                            className='mr-1 h-4 w-2 animate-spin'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                        >
                                            <circle
                                                className='opacity-25'
                                                cx='12'
                                                cy='12'
                                                r='10'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='4'
                                            />
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 0116 0 8 8 0 01-16 0z'
                                            />
                                        </svg>
                                        Resending...
                                    </>
                                ) : cooldownTime > 0 ? (
                                    <>
                                        <RefreshCw className='mr-1 h-4 w-4' />
                                        Resend code ({cooldownTime}s)
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className='mr-1 h-4 w-4' />
                                        Resend
                                    </>
                                )}
                            </Button>
                            <Button variant='default' radius='lg' type='submit'>
                                Verify Code
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

interface ResetPasswordStepProps {
    password: string
    setPassword: (password: string) => void
    confirmPassword: string
    setConfirmPassword: (confirmPassword: string) => void
    handlePasswordSubmit: (e: React.FormEvent) => Promise<void>
    handleBack: () => void
    isSubmitting: boolean
}

const ResetPasswordStep: React.FC<ResetPasswordStepProps> = ({
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handlePasswordSubmit,
    handleBack,
    isSubmitting,
}) => {
    return (
        <>
            <h3 className='text-center text-2xl font-bold text-slate-950 dark:text-slate-50'>
                Step 3: Reset Password
            </h3>
            <form onSubmit={handlePasswordSubmit}>
                <div className='mt-8'>
                    <div>
                        <label className='block' htmlFor='password'>
                            New Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your new password'
                            className='mt-2 w-full rounded-md border px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-hidden'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block' htmlFor='confirm-password'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirm-password'
                            placeholder='Confirm your new password'
                            className='mt-2 w-full rounded-md border px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-hidden'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-6 flex items-baseline justify-between'>
                        <Button
                            variant='default'
                            radius='lg'
                            onClick={handleBack}
                            type='button'
                        >
                            <Undo2 />
                            Back
                        </Button>
                        <Button
                            variant='default'
                            radius='lg'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            <KeyRound />
                            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default function ForgotPasswordPage() {
    const t = useTranslations('feedback')
    const [email, setEmail] = useState('')
    const [resetStep, setResetStep] = useState<number>(0)
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [cooldownTime, setCooldownTime] = useState(0)
    const [verificationSentEmail, setVerificationSentEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (cooldownTime > 0) {
            timer = setTimeout(() => {
                setCooldownTime(cooldownTime - 1)
            }, 1000)
        }
        return () => clearTimeout(timer)
    }, [cooldownTime])

    // Check if verification is sent to current email
    const isVerificationSent = email === verificationSentEmail && email !== '';

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
        // Reset cooldown if email changes from the one verification was sent to
        if (verificationSentEmail && newEmail !== verificationSentEmail) {
            setCooldownTime(0);
            setVerificationSentEmail('');
        }
    };

    const sendVerificationCode = async (
        email: string,
        setLoadingState: (isLoading: boolean) => void,
        isResend: boolean
    ): Promise<boolean> => {
        setError('')
        setLoadingState(true)

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    template: 1, // Template for password reset
                    type: 'reset' // Specify this is for password reset
                }),
            })

            if (response.ok) {
                setCooldownTime(120)
                setVerificationSentEmail(email)
                return true
            } else {
                // Safely parse the JSON response
                let data = { error: null, remaining: null }
                try {
                    data = await response.json()
                } catch (jsonError) {
                    console.error('Failed to parse error response:', jsonError)
                }

                setError(
                    data.error ||
                        `Failed to ${isResend ? 'resend' : 'send'} verification code (${response.status})`
                )

                if (data.remaining) {
                    setCooldownTime(data.remaining)
                }
                return false
            }
        } catch (err) {
            console.error('Verification code error:', err)
            setError(
                `An error occurred while ${isResend ? 'resending' : 'sending'} verification code`
            )
            return false
        } finally {
            setLoadingState(false)
        }
    }

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Email validation with regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        const success = await sendVerificationCode(
            email,
            setIsSubmitting,
            false
        )
        if (success) {
            setResetStep(1)
            setCooldownTime(120)
            setVerificationSentEmail(email)
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace on empty input to move back and clear previous field
        if ((e.key === 'Backspace' || e.key === 'Delete') &&
            verificationCode[index] === '' &&
            index > 0) {

            const newCode = [...verificationCode];
            newCode[index - 1] = '';
            setVerificationCode(newCode);

            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');

        // Only process numbers
        const pastedNumbers = pastedText.replace(/[^0-9]/g, '');

        // Limit to the maximum length we need
        const characters = pastedNumbers.slice(0, 6);

        if (!characters) return;

        // Create a new verification code array with pasted characters
        const newCode = [...verificationCode];

        // Fill the inputs with the pasted characters
        for (let i = 0; i < characters.length && i + index < 6; i++) {
            newCode[index + i] = characters[i];
        }

        setVerificationCode(newCode);

        // Calculate which field to focus next
        const nextIndex = Math.min(index + characters.length, 5);
        setTimeout(() => {
            const nextInput = document.getElementById(`code-${nextIndex}`);
            nextInput?.focus();
        }, 0);
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...verificationCode]
            newCode[index] = value
            setVerificationCode(newCode)

            // Auto-focus next input
            if (value.length === 1 && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`)
                nextInput?.focus()
            }
        }
    }

    const handleBack = () => {
        if (resetStep > 0) {
            setResetStep(resetStep - 1)
        } else {
            router.back()
        }
    }

    const handleVerificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const code = verificationCode.join('')
        if (code.length !== 6) {
            setError('Please enter the complete verification code')
            return
        }

        try {
            const result = await verifyResetCode(email, code)
            if (result.success) {
                setResetStep(2)
            } else {
                setError(result.message || 'Invalid verification code')
            }
        } catch (err) {
            setError('An error occurred during verification')
        }
    }

    const handleResendCode = async () => {
        if (cooldownTime > 0 || !email) return
        await sendVerificationCode(email, setIsResending, true)
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setIsSubmitting(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            setIsSubmitting(false)
            return
        }

        try {
            const result = await resetPassword(email, verificationCode.join(''), password)

            if (result.success) {
                setSuccess(true)
                // Redirect to login page after successful password reset
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            } else {
                setError(result.message || 'Failed to reset password')
            }
        } catch (err) {
            console.error('Password reset error:', err)
            setError('An error occurred while resetting your password')
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderStep = () => {
        switch (resetStep) {
            case 0:
                return (
                    <EmailStep
                        email={email}
                        setEmail={handleEmailChange}
                        handleEmailSubmit={handleEmailSubmit}
                        handleBack={handleBack}
                        isSubmitting={isSubmitting}
                        cooldownTime={cooldownTime}
                        isVerificationSent={isVerificationSent}
                    />
                )
            case 1:
                return (
                    <VerificationStep
                        email={email}
                        verificationCode={verificationCode}
                        handleCodeChange={handleCodeChange}
                        handleVerificationSubmit={handleVerificationSubmit}
                        handleBack={handleBack}
                        handleResendCode={handleResendCode}
                        cooldownTime={cooldownTime}
                        isResending={isResending}
                        handleKeyDown={handleKeyDown}
                        handlePaste={handlePaste}
                    />
                )
            case 2:
                return (
                    <ResetPasswordStep
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        handlePasswordSubmit={handlePasswordSubmit}
                        handleBack={handleBack}
                        isSubmitting={isSubmitting}
                    />
                )
        }
    }

    if (success) {
        return (
            <div className='flex min-h-screen flex-col'>
                <Header />
                <div className='flex flex-1 items-center justify-center'>
                    <div className='w-full max-w-lg rounded-lg px-8 py-6 text-center'>
                        <h3 className='text-2xl font-bold mb-4 text-slate-950 dark:text-slate-50'>
                            Password Reset Successful
                        </h3>
                        <p className='text-slate-950 dark:text-slate-50'>
                            Your password has been successfully reset. Redirecting to login page...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <div className='flex flex-1 items-center justify-center'>
                <div className='w-full max-w-lg rounded-lg px-8 py-6 absolute'>
                    {renderStep()}
                    {error && <p className='mt-4 text-red-500'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
