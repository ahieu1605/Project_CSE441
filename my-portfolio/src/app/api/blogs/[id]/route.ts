import { NextResponse } from 'next/server';
import prisma from '../../../db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const blog = await prisma.blog.findUnique({ where: { id: Number(params.id) } });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { title, content } = await req.json();
    const blog = await prisma.blog.update({
        where: { id: Number(params.id) },
        data: { title, content },
    });
    return NextResponse.json(blog);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.blog.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Deleted' });
}