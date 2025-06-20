import { NextResponse } from 'next/server';
import prisma from '../../../db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashed }
    });
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}