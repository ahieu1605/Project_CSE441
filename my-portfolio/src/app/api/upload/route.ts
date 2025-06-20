import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const { image, filename } = await req.json();
    const buffer = Buffer.from(image, 'base64');
    const filePath = path.join(process.cwd(), 'public', 'assets', filename);
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json({ url: `/assets/${filename}` });
}