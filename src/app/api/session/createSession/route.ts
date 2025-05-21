import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session/createSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ success: false, message: 'Failed to create session', sessionId: null });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to create session:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', sessionId: null },
    );
  }
}
