import { cookies } from 'next/headers';

export async function getConfig() {
  const cookieStore = await cookies();
  const geminiApiKey = cookieStore.get('gemini_api_key')?.value;
  
  return {
    tmdb: { apiKey: process.env.TMDB_API_KEY || '' },
    gemini: { apiKey: process.env.GEMINI_API_KEY || geminiApiKey || '' }
  };
}