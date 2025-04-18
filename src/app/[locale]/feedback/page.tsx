import FeedbackForm from '@/components/FeedbackForm'
import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header'

export default function FeedbackPage() {
    const t = useTranslations('feedback')

    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <h1 className='mb-6 text-3xl font-bold text-slate-950 dark:text-slate-50'>
                    {t('pageTitle')}
                </h1>
                <FeedbackForm />
            </div>
        </div>
    )
}
