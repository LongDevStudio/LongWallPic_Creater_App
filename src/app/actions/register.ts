'use server'

import { sql } from '@vercel/postgres'
import { Redis } from '@upstash/redis'
import bcrypt from 'bcrypt'
import { GenericResponse } from '@/models/response/GenericResponse'

const redis = Redis.fromEnv()

export async function verifyAndCreateUser(email: string, verificationCode: string, password: string, username: string): Promise<GenericResponse<null>> {
    try {
        // Get stored verification code from Redis
        const storedCode = await redis.get(`register:${email}`)

        if (!storedCode || storedCode.toString() !== verificationCode) {
            return {
                success: false,
                code: 400,
                message: 'Invalid or expired verification code'
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // update the user's username and password
        await sql`
            UPDATE users
            SET username = ${username}, password_hash = ${hashedPassword}
            WHERE email = ${email}
        `

        // Delete verification code from Redis
        await redis.del(`register:${email}`)

        return {
            success: true,
            code: 200,
            message: 'User registered successfully'
        }
    } catch (error) {
        console.error('Error in verifyAndCreateUser:', error)
        return {
            success: false,
            code: 500,
            message: 'Internal server error'
        }
    }
}

export async function verifyCode(email: string, verificationCode: string) {
    try {
        const storedCode = await redis.get(`register:${email}`)
        console.log(`Stored code: ${storedCode}`)

        if (!storedCode || storedCode.toString() !== verificationCode) {
            return {
                success: false,
                code: 400,
                message: 'Invalid or expired verification code'
            }
        }

        // Check if user already exists
        const existingUser = await sql`
            SELECT id FROM users WHERE email = ${email}
        `
        if (existingUser.rows.length > 0) {
            return {
                success: false,
                code: 400,
                message: 'User already exists'
            }
        }

        // create a tmp user account
        const anonymousPwd = await bcrypt.hash('anonymous1!', 10)
        await sql`
            INSERT INTO users (username, email, password_hash, registration_method, created_at, updated_at)
            VALUES ('anonymous', ${email}, ${anonymousPwd}, 1, NOW(), NOW())
        `

        return {
            success: true,
            code: 200,
            message: 'Verification code is valid'
        }
    } catch (error) {
        console.log(`Error in verifyCode: ${error}`)
        return {
            success: false,
            message: 'Failed to verify code'
        }
    }
}
