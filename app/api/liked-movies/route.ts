import { NextResponse } from 'next/server';
import { getLikedMoviesServer } from '@/app/server-api';

export async function GET() {
  try {
    const result = await getLikedMoviesServer();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching liked movies:', error);
    return NextResponse.json(
      { results: [], message: 'Error fetching liked movies' }, 
      { status: 500 }
    );
  }
} 