'use client'

import { useTheme } from 'next-themes'
import { useTranslations } from "next-intl"
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor, Wine, LeafyGreen } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ThemeSelector() {
    const t = useTranslations()
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const getThemeIcon = (currentTheme: string) => {
        switch (currentTheme) {
            case 'light': return <Sun className="h-4 w-4" />
            case 'dark': return <Moon className="h-4 w-4" />
            case 'system': return <Monitor className="h-4 w-4" />
            case 'wine': return <Wine className="h-4 w-4" />
            case 'leafy': return <LeafyGreen className="h-4 w-4" />
            default: return <Sun className="h-4 w-4" />
        }
    }

    if (!mounted) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {getThemeIcon(theme ?? 'default')}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4"/>
                    <span>{t('theme.light')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4"/>
                    <span>{t('theme.dark')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4"/>
                    <span>{t('theme.system')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("wine")}>
                    <Wine className="mr-2 h-4 w-4"/>
                    <span>{t('theme.wine')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("leafy")}>
                    <LeafyGreen className="mr-2 h-4 w-4"/>
                    <span>{t('theme.leafy')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
