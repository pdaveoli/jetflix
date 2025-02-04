const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('095d10d1bdc8d14ed4bc2ccb2447710b')

const findMovie = async (title: string) => {
    // Equivalant to { query: title }
    const res = await moviedb.searchMovie(title)
  
    return res
}

const findMovieByGenre = async (genre: string) => {
    const res = await moviedb.genreMovieList({ id: genre })
  
    return res
}
