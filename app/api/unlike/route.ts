import { NextResponse } from 'next/server';
import { unlikeMovieServer } from '@/app/server-api';

export async function POST(request: Request) {
  try {
    const { movieId } = await request.json();
    
    if (!movieId || isNaN(Number(movieId))) {
      return NextResponse.json(
        { success: false, message: 'Invalid movie ID' }, 
        { status: 400 }
      );
    }
    
    const result = await unlikeMovieServer(Number(movieId));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error unliking movie:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 