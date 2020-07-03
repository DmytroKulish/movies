// easy debouncer ===>
// let timeoutId;
// const onInput = (event) => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(() => {
//     fetchData(event.target.value);
//   }, 500);
// };

// hard debouncer ====>
const debounce = (func, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "27c0d9f3",
      i: movie.imdbID,
    },
  });
  console.log(response.data);
  summaryElement.innerHTML = movieTemplet(response.data);
  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }
  if (leftMovie && rightMovie) {
    runComperison();
  }
};

const runComperison = () => {
const leftSideStats = document.querySelectorAll('#left-summary .notification');
const rightSideStats = document.querySelectorAll('#right-summary .notification');
leftSideStats.forEach((leftStat,index)=>{
const rightStat = rightSideStats[index];
const leftSideValue = leftStat.dataset.value;
const rightSideValue = rightStat.dataset.value;
if(rightSideValue>leftSideValue){
  leftStat.classList.remove('is-primary');
  leftStat.classList.add('is-warning');
}else{
  rightStat.classList.remove('is-primary');
  rightStat.classList.add('is-warning');
}

});


};

const movieTemplet = (movieDetail) => {
  const awards = movieDetail.Awards.match(/\d+/g)
    .map((a) => {
      return parseInt(a);
    })
    .reduce((a, b) => {
      return a + b;
    });
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));

  return `
<article class="media">
<figure class="media-left">
<p class="image">
<img src="${movieDetail.Poster}"/>
</p>
</figure>
<div class="media-content">
<div class="content">
<h1>${movieDetail.Title}</h1>
<h4>${movieDetail.Genre}</h4>
<p>${movieDetail.Plot}</p>
</div>
</div>
</article>
<article>
<article data-value=${awards} class="notification is-primary">
<p class="title">${movieDetail.Awards}</p>
<p class="subtitle">Awards</p>
</article>
<article data-value=${dollars} class="notification is-primary">
<p class="title">${movieDetail.BoxOffice}</p>
<p class="subtitle">Revenue</p>
</article>
<article data-value=${metascore} class="notification is-primary">
<p class="title">${movieDetail.Metascore}</p>
<p class="subtitle">Metascore</p>
</article>
<article data-value=${imdbRating} class="notification is-primary">
<p class="title">${movieDetail.imdbRating}</p>
<p class="subtitle">IMDB Rating</p>
</article>
<article data-value=${imdbVotes} class="notification is-primary">
<p class="title">${movieDetail.imdbVotes}</p>
<p class="subtitle">IMDB Votes</p>
</article>
`;
};
