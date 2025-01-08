'use server';

import { sql } from '@vercel/postgres';

export async function submitFeedback(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
        throw new Error('所有字段都是必填的');
    }

    try {
        await sql`
      INSERT INTO feedbacks (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `;
        return { success: true };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw new Error('提交反馈时出错');
    }
}
