import { NextRequest, NextResponse } from 'next/server';
import { Message } from 'ai';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' });
  }

  try {
    const res = await fetch(`http://localhost:8080/session/${sessionId}`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch chat history' });
    }

    const messages: Message[] = await res.json();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('API /chat-history error:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
