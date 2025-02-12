'use client'

import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { themes } from '@/config/themes'
import { useAuth } from '@/contexts/AuthContext'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

interface ThemeSelectorProps {
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export function ThemeSelector({ radius }: ThemeSelectorProps) {
    const t = useTranslations()
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { isLoggedIn, logout } = useAuth()

    useEffect(() => {
        setMounted(true)
    }, [])

    const getThemeIcon = (currentTheme: string) => {
        return themes[currentTheme]?.icon || themes.light.icon
    }

    if (!mounted) {
        return null
    }

    const availableThemes = Object.entries(themes).filter(([_, config]) => {
        if (!config.visible) return false
        return !(config.requiresAuth && !isLoggedIn)
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' radius={radius}>
                    {React.createElement(getThemeIcon(theme ?? 'light'), {
                        className: 'h-4 w-4',
                    })}
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {availableThemes.map(([themeKey, config]) => (
                    <DropdownMenuItem
                        key={themeKey}
                        onClick={() => setTheme(themeKey)}
                        className={`${theme === themeKey ? 'font-semibold' : ''}`}
                        data-state={theme === themeKey ? 'selected' : 'default'}
                    >
                        {React.createElement(config.icon, {
                            className: `mr-2 h-4 w-4 ${theme === themeKey ? 'stroke-2' : 'stroke-1'}`,
                        })}
                        <span>{t(config.translationKey)}</span>
                        {theme === themeKey && (
                            <span className='ml-auto'>✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
