import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {EmailTemplate, RestPwdEmailTemplate} from '@/components/email-template';
import {Redis} from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = Redis.fromEnv();

export async function POST(request: Request) {
    try {
        const {email, username, template = 0} = await request.json();

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        let emailTemplate;
        let emailSubject;
        let from: string;

        if (template === 1) {
            await redis.set(`reset-password:${email}`, verificationCode, {
                ex: 10 * 60
            });
        }

        if (template === 1) {
            emailTemplate = RestPwdEmailTemplate({
                firstName: username,
                verificationCode
            });
            emailSubject = "Reset Password Verification Code";
            from = 'NO_REPLY <noreply@ems.gluttongk.com'

        } else {
            const { data, error } = await resend.emails.send({
                from: 'DW <onboarding@cms.gluttongk.com>',
                to: ['davidgluttongk@outlook.com'],
                subject: 'Hello world',
                react: EmailTemplate({ firstName: 'John' }),
            });

            if (error) {
                return Response.json({ error }, { status: 500 });
            }

            return Response.json(data);
        }

        const data = await resend.emails.send({
            from: 'NO_REPLY <noreply@ems.gluttongk.com>',
            to: [email],
            subject: emailSubject,
            react: emailTemplate,
        });

        // vercel function way
        // const res = await fetch('https://api.resend.com/emails', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        //     },
        //     body: JSON.stringify({
        //         from: 'Acme <onboarding@resend.dev>',
        //         to: ['delivered@resend.dev'],
        //         subject: 'hello world',
        //         html: '<strong>it works!</strong>',
        //     }),
        // });
        //
        // if (res.ok) {
        //     const data = await res.json();
        //     return Response.json(data);
        // }


        return NextResponse.json({success: true});

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            {error: 'Error sending email'},
            {status: 500}
        );
    }
}
