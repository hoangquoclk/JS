const URL_DISCOVER = 
    "https://api.themoviedb.org/3/discover/movie?api_key=";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const API_KEY = "276dac7f6ba919bdfd9d956cdcbd3d37";
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=";

const CHERVON_CLICK = document.querySelector('fa-chevron-left');
const AD_INFO = document.querySelectorAll('ad-info');
const SLIDE_IMG = document.querySelectorAll('.img-ad');
const SLIDE_CONTAINER = document.querySelector('.ad-info');
const NEXT_BTN = document.querySelector('.fa-chevron-right');
const PREV_BTN = document.querySelector('.fa-chevron-left');
const NUMBER_AD = document.querySelector('.number-ad');
const MOVIE_IMGS = document.querySelectorAll('.row-5 .movie-img');
const LIGHTBULB = document.querySelector('.fa-lightbulb');
const SEARCH = document.querySelector(".listSearch");
const NEXTPAGE = document.getElementById("nextPage");
const PREVPAGE = document.getElementById("prevPage");
const SEARCH_TITLE = document.getElementById("search-title");

let numberOfImages = SLIDE_IMG.length;
// let slideWidth = SLIDE_IMG[0].clientWidth; // xét độ rộng của phần tử đầu tiên
let currentSlide = 0;

const fa_bar_icon = document.querySelector('.fa-bars');

// get movie

var formSearch = document.getElementById("form-search");

formSearch.addEventListener("submit", function() {
    var searchText = document.getElementById("search-text").value;

    localStorage.setItem("searchValue", searchText);
});

var inputSearch = localStorage.getItem("searchValue");
localStorage.removeItem("searchValue");

async function getMovies(url, category) {
    const resp = await fetch(url);
    const respData = await resp.json();
    // điều kiện cho nút next
    if(respData.results.length >= 20) {
        NEXTPAGE.disabled = false;
    }
    else {
        NEXTPAGE.disabled = true;
    }
    // nút prev
    if(respData.page == 1) {
        PREVPAGE.disabled = true;
    }
    else {
        PREVPAGE.disabled = false;
    }

    if(respData.page == 1 && respData.results.length == 0) {
        document.getElementById("page").innerText = "0 kết quả";
    }
    else {
        updateNumPage();
    }

    ShowMovies(respData.results, category);
}

getMovies(URL_SEARCH + API_KEY + "&query=" + inputSearch + "", SEARCH);

function ShowMovies(movies, category) {
    category.innerHTML = '';
    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("row-5");
        movieEl.innerHTML = `
            <div class="movie-img">
                <img src="${IMG_PATH + movie.poster_path}" alt="">
                <div class="review-movie">
                    <a href="" class="movie-name">${movie.title}</a>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                    </div>
                    <div class="movie-time">
                        <i class="fas fa-eye"></i>
                        <span>${movie.popularity}</span>
                    </div>
                    <p class="description">${movie.overview}</p><br>
                    <small class="release-date">
                        Release Date: 
                        <strong>${movie.release_date}</strong>
                    </small><br>
                    <small class="release-date">
                        Vote count: 
                        <strong>${movie.vote_count}</strong>
                    </small><br>
                    <small class="release-date">
                        Original Language: 
                        <strong>${movie.original_language}</strong>
                    </small><hr>
                    <div class="trailer-detail">
                        <i class="far fa-play-circle"></i>
                        <small><a href="">Trailer</a></small>
                        <i class="fas fa-info-circle"></i>
                        <small><a href="">Detail</a></small>
                    </div>
                </div>
                <a href="">
                    <div class="hover-img">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </a>
                <div class="point-rate" style="background-color: ${getPointRate(movie.vote_average)};">${movie.vote_average}</div>
            </div>
            <a href="" class="movie-name">${movie.title}</a>
            <br>
            <small>${movie.release_date}</small>
        `;
        category.appendChild(movieEl);
    });
}

function getPointRate(point) {
    if(point >= 8) {
        return "green";
    }
    else if(point >= 5) {
        return "orange";
    }
    else return "red";
}



// click pagination
let numPage = 1;

SEARCH_TITLE.innerText = inputSearch;
function updateNumPage() {
    document.getElementById("page").innerText = "(Page " + numPage +")";
}


NEXTPAGE.addEventListener("click", function(){
    numPage++;
    getMovies(URL_SEARCH + API_KEY + "&query=" + inputSearch + "&page=" + numPage, SEARCH);
});

PREVPAGE.addEventListener("click", function(){
    if(numPage >= 2) {
        numPage--;
        getMovies(URL_SEARCH + API_KEY + "&query=" + inputSearch + "&page=" + numPage, SEARCH);
    }
});

// set active class
function setActiveClass() {
    let currentActive = document.querySelector('.img-ad.active');
    currentActive.classList.remove("active");

    SLIDE_IMG[currentSlide].classList.add("active");
    
    // set active của thẻ số li
    let currentLi = document.querySelector(".number-ad .active");
    currentLi.classList.remove("active");
    NUMBER_AD.children[currentSlide].classList.add("active");

    // remove animation in a
    let removeAnimA = document.querySelectorAll(".img-ad a");
    removeAnimA.forEach((a) => {
        a.style.removeProperty("animation");
    });
    //set animation on a
    let animEleA = document.querySelector(".img-ad.active a");
    animEleA.style.animation = "animation_a 2s ease";
}

// GET POSITION OF REVIEW FILM
function hoverReviewFilm() {
    MOVIE_IMGS.forEach((mov) => {
        let widthWindow = window.innerWidth;
        let widthPosRight = mov.getBoundingClientRect().right;
        let widthPosLeft = mov.getBoundingClientRect().left; // get the right position
        let widthEle = mov.getBoundingClientRect().width; // get width the element
        // let widthEleReview = widthEle*1.2; 

        if(widthWindow - widthPosRight < widthEle && widthPosLeft < widthEle) {
            reviewMovie = mov.querySelector('.review-movie');
            reviewMovie.style.top = "100%";
            reviewMovie.style.left = "0%";
        }

        else if(widthWindow - widthPosRight < widthEle) {
            reviewMovie = mov.querySelector('.review-movie');
            reviewMovie.style.top = "0%";
            reviewMovie.style.left = "-100%";
        }
        else {
            reviewMovie = mov.querySelector('.review-movie');
            reviewMovie.style.top = "0%";
            reviewMovie.style.left = "100%";  
        }
    });
}

window.addEventListener("resize", function(){
    MOVIE_IMGS.forEach((mov) => {
        let widthWindow = window.innerWidth;
        let widthPosRight = mov.getBoundingClientRect().right;
        let widthPosLeft = mov.getBoundingClientRect().left; // get the right position
        let widthEle = mov.getBoundingClientRect().width; // get width the element
        // let widthEleReview = widthEle * 1.2; 
        
        if(widthWindow - widthPosRight < widthEle && widthPosLeft < widthEle) {
            reviewMovie = mov.querySelector('.review-movie');
            reviewMovie.style.top = "100%";
            reviewMovie.style.left = "0%";
        }

        else if(widthWindow - widthPosRight < widthEle) {
            reviewMovie = mov.querySelector('.review-movie');
            reviewMovie.style.left = "-100%";
            reviewMovie.style.top = "0%";
        }
        else {
            reviewMovie = mov.querySelector('.review-movie');
            reviewMovie.style.left = "100%";
            reviewMovie.style.top = "0%";
        }
    });
});
hoverReviewFilm();

// click to turn on/ off lightbulb

var url = ["url(backgroundBlack.jpg)",
    "url(backgroundWhite.jpg)"];
var i = 0;
var word_color = ["#fff","#000"];

if (localStorage.lightOff == "lightOff" ) {
    document.querySelectorAll(".menu .menu-list li a").forEach((menu) => {
        menu.classList.toggle("white");
    });

    document.querySelectorAll(".title h1").forEach((title) => {
        title.classList.toggle("white");
    });

    document.querySelector(".account").classList.toggle("white");
    document.querySelector(".day-night").classList.toggle("white");
    document.querySelector(".fa-search").classList.toggle("white");
    document.querySelector("body").style.background = url[i];
    i++;
}

LIGHTBULB.addEventListener("click", () => {
    if(i == url.length) {
        i = 0;
    }
    
    if (localStorage.lightOff != "lightOff" ) {
        $('body').toggleClass("lightOff", true );
        localStorage.lightOff = "lightOff";
    } else {
        $('body').toggleClass("lightOff", false );
        localStorage.lightOff = "";
    }

    document.querySelectorAll(".menu .menu-list li a").forEach((menu) => {
        menu.classList.toggle("white");
    });

    document.querySelectorAll(".title h1").forEach((title) => {
        title.classList.toggle("white");
    });

    document.querySelector(".account").classList.toggle("white");
    document.querySelector(".day-night").classList.toggle("white");
    document.querySelector(".fa-search").classList.toggle("white");
    document.querySelector("body").style.background = url[i];
    i++;
});