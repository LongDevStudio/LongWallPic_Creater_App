import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const { rows } = await sql`
            SELECT id, username 
            FROM users 
            WHERE email = ${email} and is_creator = true
        `;

        if (rows.length === 0) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            username: rows[0].username
        });
        
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
