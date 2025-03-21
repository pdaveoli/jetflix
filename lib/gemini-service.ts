import { GoogleGenerativeAI } from '@google/generative-ai';

// Function to get recommendations using Gemini AI
export async function getRecommendations(likedMovies: any[]) {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Missing Gemini API key');
    // Return fallback recommendations if API key is missing
    return { 
      recommendations: [
        {
          title: "Inception",
          year: "2010",
          reason: "Fallback recommendation (Gemini API key not configured)"
        },
        {
          title: "The Dark Knight",
          year: "2008",
          reason: "Fallback recommendation (Gemini API key not configured)"
        },
        {
          title: "Interstellar",
          year: "2014",
          reason: "Fallback recommendation (Gemini API key not configured)"
        }
      ] 
    };
  }
  
  if (likedMovies.length === 0) {
    return { recommendations: [] };
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Extract relevant info from liked movies
    const moviesInfo = likedMovies.map(movie => ({
      title: movie.title,
      genres: movie.genres?.map((g: any) => g.name) || [],
      overview: movie.overview,
      release_date: movie.release_date
    }));

    // Prompt for Gemini
    const prompt = `
    Based on these movies that a user has liked:
    ${JSON.stringify(moviesInfo, null, 2)}
    
    Please recommend 5 similar movies they might enjoy. Return your response as a valid JSON array with each movie having 'title', 'year', and 'reason' properties. 
    The 'reason' should explain why this movie might appeal to them based on their liked movies.
    Format your response as a JSON array only, with no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : '[]';
      const recommendations = JSON.parse(jsonString);
      
      return { recommendations };
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return { recommendations: [] };
    }
  } catch (error) {
    console.error('Error getting recommendations from Gemini:', error);
    return { recommendations: [] };
  }
}