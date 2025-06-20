import { NextResponse } from 'next/server';
import prisma from '../../../db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

    // Simple session (cookie) - production nên dùng JWT hoặc next-auth
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}