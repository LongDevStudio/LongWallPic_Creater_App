import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const body = await request.json();



    return NextResponse.json(
        {error: 'error'},
        {status: 400}
    )
}
