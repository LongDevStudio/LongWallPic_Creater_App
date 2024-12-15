'use client'

import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { LuLanguages } from "react-icons/lu";

export function LanguageSelector() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'zh' : 'en'
        router.push(pathname.replace(`/${locale}`, `/${newLocale}`))
    }

    return (
        <div
            onClick={toggleLanguage}
            className="ml-4 flex items-center cursor-pointer text-white"
        >
            <LuLanguages size={26} className="mr-2" />
            {locale === 'en' ? '中文' : 'English'}
        </div>
    )
}
