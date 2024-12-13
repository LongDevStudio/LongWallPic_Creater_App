'use client'

import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSelector() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'zh' : 'en'
        router.push(pathname.replace(`/${locale}`, `/${newLocale}`))
    }

    return (
        <Button 
            variant="outline" 
            onClick={toggleLanguage}
            className="ml-4"
        >
            {locale === 'en' ? '中文' : 'English'}
        </Button>
    )
} 