'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitFeedback } from '@/app/actions/feedback';

export default function FeedbackForm() {
    const t = useTranslations('feedback');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(event.currentTarget);
        try {
            await submitFeedback(formData);
            setSubmitStatus('success');
            formRef.current?.reset();
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input id="name" name="name" required />
            </div>
            <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" name="email" type="email" required />
            </div>
            <div>
                <Label htmlFor="subject">{t('subject')}</Label>
                <Input id="subject" name="subject" required />
            </div>
            <div>
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('submitting') : t('submit')}
            </Button>
            {submitStatus === 'success' && (
                <p className="text-green-600">{t('submitSuccess')}</p>
            )}
            {submitStatus === 'error' && (
                <p className="text-red-600">{t('submitError')}</p>
            )}
        </form>
    );
}

