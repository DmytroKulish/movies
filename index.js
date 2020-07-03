const fetchData = async (searchTerm) => {
  const getMovie = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "27c0d9f3",
      s: searchTerm,
    },
  });
  if (getMovie.data.Error) {
    return [];
  }
  return getMovie.data.Search;
};



const autocompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSrc}"/>
    ${movie.Title} (${movie.Year})
  `;
  },

  inputValue(movie) {
    return `${movie.Title} (${movie.Year})`;
  },
  async fetchData(searchTerm) {
    const getMovie = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "27c0d9f3",
        s: searchTerm,
      },
    });
    if (getMovie.data.Error) {
      return [];
    }
    return getMovie.data.Search;
  }
}


createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'),
    'left'
    );
  },

});
createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'),
    'right');
  },
});










