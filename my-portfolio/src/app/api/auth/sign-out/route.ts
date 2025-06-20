import { NextResponse } from 'next/server';

export async function POST() {
    // Xóa cookie/session nếu có
    return NextResponse.json({ message: 'Signed out' });
}