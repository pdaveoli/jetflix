import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In a production app, store this in a database instead of cookies
export async function POST(request: Request) {
  try {
    const { key } = await request.json();
    
    if (!key) {
      return NextResponse.json(
        { success: false, message: 'API key is required' },
        { status: 400 }
      );
    }
    
    // Store API key in an encrypted cookie
    const cookieStore = await cookies();
    await cookieStore.set({
      name: 'gemini_api_key',
      value: key,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    
    // Update environment variable for the current session
    process.env.GEMINI_API_KEY = key;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving API key:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save API key' },
      { status: 500 }
    );
  }
}