import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function GET(req: Request) {
    // Lấy userId từ session/cookie, ví dụ tạm hardcode userId = 1
    const userId = 1;
    const profile = await prisma.profile.findUnique({ where: { userId } });
    return NextResponse.json(profile);
}

export async function PUT(req: Request) {
    const userId = 1; // Lấy từ session/cookie
    const { bio, avatar } = await req.json();
    const profile = await prisma.profile.upsert({
        where: { userId },
        update: { bio, avatar },
        create: { userId, bio, avatar },
    });
    return NextResponse.json(profile);
}