class MovieService {
  constructor() {
    const API_KEY = 'fddd6e2e';
    this.BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
  }

  async searchMovie(query, year, type) {
    let url = `${this.BASE_URL}s=${query}`;
    if (Number(year) >= 1920 && Number(year) <= 2040) {
      url += `&y=${year}`;
    }
    const MOVIE_TYPES = ['movie', 'series', 'episode'];
    if (MOVIE_TYPES.some((item) => item === type)) {
      url += `&type=${type}`;
    }
    return (await fetch(url)).json();
  }

  async getMovieByTitle(title) {
    if (!title) throw new Error('Unexpected movie title');
    const url = `${this.BASE_URL}t=${title}`;
    return (await fetch(url)).json();
  }
}

const movieService = new MovieService();

export default movieService;
