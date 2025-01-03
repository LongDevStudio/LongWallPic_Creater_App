import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(request: Request) {
    try {
        const { email, verificationCode, newPassword } = await request.json();

        // 从 Redis 获取验证码
        const storedCode = await redis.get(`reset-password:${email}`);
        console.log('storedCode:', storedCode, " and typeof storedCode:", typeof storedCode);
        console.log('verificationCode:', verificationCode, " and typeof storedCode:", typeof storedCode);

        if (!storedCode || storedCode.toString().trim() !== verificationCode.toString().trim() ) {
            return NextResponse.json(
                { message: 'Invalid or expired verification code' },
                { status: 400 }
            );
        }

        // 更新密码
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await sql`
            UPDATE users 
            SET password_hash = ${hashedPassword}
            WHERE email = ${email}
        `;

        // 删除已使用的验证码
        await redis.del(`reset-password:${email}`);

        return NextResponse.json({
            message: 'Password reset successfully'
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        return NextResponse.json(
            { message: 'Error resetting password' },
            { status: 500 }
        );
    }
}
