import movieService from './api.js';

const renderMovie = (movie) => {
  if (movie.Response === 'False') {
    const errorMsg = movie.Error;
    console.log(errorMsg);
  } else {
    const { Poster, Title, Year, Runtime, imdbRating, Genre, Plot, Director, Actors } = {
      ...movie
    };
    document.querySelector('.movie__poster img').src = Poster;
    document.querySelector('.movie__title').append(Title);
    document.querySelector('.movie__year').append(Year);
    document.querySelector('.movie__runtime').append(Runtime);
    document.querySelector('.movie__rating').append(imdbRating);
    document.querySelector('.movie__genre').append(Genre);
    document.querySelector('.movie__plot').append(Plot);
    document.querySelector('.movie__director span').append(Director);
    document.querySelector('.movie__actors span').append(Actors);
  }
};

window.onload = () => {
  const title = new URL(document.location).searchParams.get('title');
  movieService.getMovieByTitle(title).then((result) => renderMovie(result));
};
