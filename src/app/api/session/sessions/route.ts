import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session/sessions`);
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ success: false, message: 'Failed to get sesions' });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get sessions', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', sessionId: null },
    );
  }
}