import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function GET() {
    const blogs = await prisma.blog.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(blogs);
}

export async function POST(req: Request) {
    const { title, content } = await req.json();
    const userId = 1; // Lấy từ session/cookie
    const blog = await prisma.blog.create({ data: { title, content, userId } });
    return NextResponse.json(blog);
}