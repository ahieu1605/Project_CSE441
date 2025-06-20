import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function GET() {
    const portfolios = await prisma.portfolio.findMany({ include: { user: true } });
    return NextResponse.json(portfolios);
}

export async function POST(req: Request) {
    const data = await req.json();
    const portfolio = await prisma.portfolio.create({ data });
    return NextResponse.json(portfolio);
}