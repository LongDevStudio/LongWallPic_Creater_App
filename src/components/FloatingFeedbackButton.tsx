'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const FloatingFeedbackButton = () => {
    const router = useRouter()

    return (
        <Button
            onClick={() => router.push('/feedback')}
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all z-50"
            aria-label="Feedback"
        >
            <MessageCircle className="w-6 h-6" />
        </Button>
    )
}
