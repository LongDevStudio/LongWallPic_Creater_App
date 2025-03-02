import { NextResponse } from "next/server";
import {Resend} from 'resend';
import {EmailTemplate, RestPwdEmailTemplate, RegisterEmailTemplate} from '@/components/email-template';
import {Redis} from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = Redis.fromEnv();
const COOLDOWN_SECONDS = 120; // 2 minutes cooldown

export async function POST(request: Request) {
    try {
        const {email, username, template = 0} = await request.json();

        console.log(`Sending email to ${email} with template ${template} at ${new Date().toISOString()}`);

        // Check cooldown for registration and reset password
        if (template === 1 || template === 2) {
            const cooldownKey = `cooldown:${template}:${email}`;
            const lastSent = await redis.get(cooldownKey);

            if (lastSent) {
                const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000);
                if (elapsed < COOLDOWN_SECONDS) {
                    const remaining = COOLDOWN_SECONDS - elapsed;
                    return NextResponse.json(
                        { error: `Please wait ${remaining} seconds before requesting a new code.`, remaining },
                        { status: 429 }
                    );
                }
            }
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        let emailTemplate;
        let emailSubject;
        let from: string;

        if (template === 1) {
            await redis.set(`reset-password:${email}`, verificationCode, {
                ex: 10 * 60
            });
        } else if (template === 2) {
            await redis.set(`register:${email}`, verificationCode, {
                ex: 10 * 60
            });
        }

        if (template === 1) {
            emailTemplate = await RestPwdEmailTemplate({
                firstName: username,
                verificationCode
            });
            emailSubject = "Reset Password Verification Code";
            from = 'NO_REPLY <noreply@ems.gluttongk.com>';
        } else if (template === 2) {
            emailTemplate = await RegisterEmailTemplate({
                firstName: username,
                verificationCode
            });
            emailSubject = "Registration Verification Code";
            from = 'NO_REPLY <noreply@ems.gluttongk.com>';
        } else {
            const { data, error } = await resend.emails.send({
                from: 'DW <onboarding@ems.gluttongk.com>',
                to: [email],
                subject: 'Hello world',
                react: await EmailTemplate({ firstName: 'John' }),
            });

            if (error) {
                console.log('Error sending email:', error);
                return Response.json({ error }, { status: 500 });
            }

            return Response.json(data);
        }

        const { data, error } = await resend.emails.send({
            from,
            to: [email],
            subject: emailSubject,
            react: emailTemplate,
        });

        if (error) {
            return NextResponse.json({success: false});
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            {error: 'Error sending email'},
            {status: 500}
        );
    }
}
