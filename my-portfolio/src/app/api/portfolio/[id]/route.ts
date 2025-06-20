import { NextResponse } from 'next/server';
import prisma from '../../../db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id: Number(params.id) } });
    if (!portfolio) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(portfolio);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const portfolio = await prisma.portfolio.update({
        where: { id: Number(params.id) },
        data,
    });
    return NextResponse.json(portfolio);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.portfolio.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Deleted' });
}