'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { LuLanguages, LuCaseSensitive } from "react-icons/lu";

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
            {locale === 'en' ? <LuCaseSensitive size={26} className="mr-2" /> : <LuLanguages size={26} className="mr-2" />}
            {locale === 'en' ? '中文' : 'English'}
        </div>
    )
}
