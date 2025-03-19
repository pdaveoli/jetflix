import { NextRequest, NextResponse } from 'next/server';
import { likeMovieServer } from '@/app/server-api';

export async function POST(
  request: NextRequest,
  context: { params: { movieId: string } }
) {
  try {
    const movieId = parseInt(context.params.movieId, 10);
    if (isNaN(movieId)) {
      return NextResponse.json({ success: false, error: 'Invalid movie ID' }, { status: 400 });
    }

    const result = await likeMovieServer(movieId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error liking movie:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
} 