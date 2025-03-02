'use server'

import { sql } from '@vercel/postgres'
import { Redis } from '@upstash/redis'
import bcrypt from 'bcrypt'
import { GenericResponse } from '@/models/response/GenericResponse'

const redis = Redis.fromEnv()

/**
 * Verifies the password reset code
 * @param email User's email address
 * @param code Verification code
 */
export async function verifyResetCode(
    email: string,
    code: string
): Promise<GenericResponse<null>> {
    try {
        // Get stored verification code from Redis
        const storedCode = await redis.get(`reset-password:${email}`)

        if (!storedCode || storedCode.toString() !== code) {
            return {
                success: false,
                code: 400,
                message: 'Invalid or expired verification code'
            }
        }

        // Check if user exists
        const userResult = await sql`
            SELECT id FROM users WHERE email = ${email}
        `

        if (userResult.rows.length === 0) {
            return {
                success: false,
                code: 404,
                message: 'User not found'
            }
        }

        return {
            success: true,
            code: 200,
            message: 'Verification successful'
        }
    } catch (error) {
        console.error('Reset code verification error:', error)
        return {
            success: false,
            code: 500,
            message: 'An error occurred during verification'
        }
    }
}

/**
 * Resets user's password with the verified code
 * @param email User's email address
 * @param code Verification code
 * @param password New password
 */
export async function resetPassword(
    email: string,
    code: string,
    password: string
): Promise<GenericResponse<null>> {
    try {
        // Verify code again for security
        const storedCode = await redis.get(`reset-password:${email}`)

        if (!storedCode || storedCode.toString() !== code) {
            return {
                success: false,
                code: 400,
                message: 'Invalid or expired verification code'
            }
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Update the user's password in the database
        await sql`
            UPDATE users
            SET password_hash = ${hashedPassword}, updated_at = NOW()
            WHERE email = ${email}
        `

        // Delete the verification code from Redis
        await redis.del(`reset:${email}`)

        return {
            success: true,
            code: 200,
            message: 'Password reset successfully'
        }
    } catch (error) {
        console.error('Password reset error:', error)
        return {
            success: false,
            code: 500,
            message: 'An error occurred while resetting the password'
        }
    }
}
