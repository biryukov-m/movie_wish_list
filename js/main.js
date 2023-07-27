import movieService from './api.js';

const clickOnCardHandler = (title) => {
  const url = new URL(window.location);
  url.pathname = '/movie.html';
  url.searchParams.set('title', title);
  window.location = url;
};

const renderMovies = (root, movies) => {
  root.innerHTML = '';
  const movieElementsArr = [];
  movies.forEach((movie, idx) => {
    idx++;
    if (idx > 7) return;

    const ARTICLE = document.createElement('article');
    ARTICLE.classList.add('card');
    if (idx === 1 || idx % 8 === 0) {
      ARTICLE.classList.add('--big');
    } else if (idx === 5 || idx % 5 === 0) {
      ARTICLE.classList.add('--vertical');
    } else if (idx === 7 || idx % 7 === 0) {
      ARTICLE.classList.add('--horizontal');
    }

    const PICTURE = document.createElement('picture');
    PICTURE.classList.add('card__img');

    const IMG = document.createElement('img');
    IMG.src = movie.Poster;
    IMG.alt = 'movie ' + idx;
    PICTURE.append(IMG);

    const CONTENT = document.createElement('div');
    CONTENT.classList.add('card__content');

    const TITLE = document.createElement('h2');
    TITLE.classList.add('card__title');
    TITLE.innerText = movie.Title;
    const YEAR = document.createElement('p');
    YEAR.classList.add('card__year');
    YEAR.innerText = movie.Year;
    const TYPE = document.createElement('p');
    TYPE.classList.add('card__type');
    TYPE.innerText = movie.Type;

    CONTENT.append(TITLE, YEAR, TYPE);

    ARTICLE.append(PICTURE, CONTENT);
    ARTICLE.onclick = () => clickOnCardHandler(movie.Title);
    movieElementsArr.push(ARTICLE);
  });
  root.append(...movieElementsArr);
};

const searchSubmitHandler = async (e) => {
  e.preventDefault();
  const errorSpan = document.getElementById('error');
  errorSpan.innerText = '';
  const { search, year, type } = e.target.elements;

  const result = await movieService.searchMovie(search.value, year.value, type.value);
  if (result.Response === 'True' && result.Search) {
    const root = document.getElementById('movies_container');
    const moviesArr = result.Search;
    renderMovies(root, moviesArr);
  } else {
    errorSpan.innerText =
      result.Error || `Error: Movies with query "${search.value}" didn't found!`;
  }
};

window.onload = () => {
  document.getElementById('search-movie').onsubmit = (e) => {
    searchSubmitHandler(e);
  };
  const { search, year, type } = new URL(document.location).searchParams;
};
