import { NextRequest, NextResponse } from 'next/server';
import { unlikeMovieServer } from '@/app/server-api';

export async function POST(
  request: NextRequest,
  { params }: { params: { movieId: string } }
) {
  try {
    const movieId = parseInt(params.movieId, 10);
    if (isNaN(movieId)) {
      return NextResponse.json({ success: false, error: 'Invalid movie ID' }, { status: 400 });
    }

    const result = await unlikeMovieServer(movieId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error unliking movie:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
} 