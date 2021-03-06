const URL_DISCOVER = 
    "https://api.themoviedb.org/3/discover/movie?api_key=";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const API_KEY = "276dac7f6ba919bdfd9d956cdcbd3d37";
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=";

const CHERVON_CLICK = document.querySelector('fa-chevron-left');
const AD_INFO = document.querySelector('.ad-info');
const SLIDE_IMG = document.querySelectorAll('.img-ad'); // 1 cái
const SLIDE_CONTAINER = document.querySelector('.ad-info');
const NEXT_BTN = document.querySelector('.fa-chevron-right');
const PREV_BTN = document.querySelector('.fa-chevron-left');
const NUMBER_AD = document.querySelector('.number-ad'); // 2 cái
const LIGHTBULB = document.querySelector('.fa-lightbulb');

const NEWESTMOVIES_CLASS = document.querySelectorAll(".listNewestMovie");
const TVSHOWHOT_CLASS = document.querySelectorAll(".list-tvShowHot");

const NEWESTMOVIES = NEWESTMOVIES_CLASS[0];
const BESTMOVIES = NEWESTMOVIES_CLASS[1];

const TVSHOWHOT = TVSHOWHOT_CLASS[0];
const ANIME = TVSHOWHOT_CLASS[1];


let numberOfImages = SLIDE_IMG.length; // 3 cái
// let slideWidth = SLIDE_IMG[0].clientWidth; // xét độ rộng của phần tử đầu tiên
let currentSlide = 0;

const fa_bar_icon = document.querySelector('.fa-bars');

// get movie

async function getMovies(url, category) {
    const resp = await fetch(url);
    const respData = await resp.json();

    ShowMovies(respData.results, category);
}

async function getMovies_2row(url, category) {
    const resp = await fetch(url);
    
    const respData = await resp.json();
    
    ShowMovies_2row(respData.results,category);
}

// get newest movie
let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '/' + mm + '/' + dd;

// window.onload = function() {
//     getMovies(URL_DISCOVER + API_KEY, NEWESTMOVIES);
// }

getMovies(URL_DISCOVER + API_KEY, NEWESTMOVIES);
// get action movie
getMovies(URL_DISCOVER + API_KEY + "&vote_average.gte=9", BESTMOVIES);
// get TV hot show 
getMovies_2row(URL_DISCOVER + API_KEY + "&page=2", TVSHOWHOT);
getMovies_2row(URL_SEARCH + API_KEY + "&query=anime", ANIME);;

const movie_not_hidden = "https://www.psuunderground.com/wp-content/uploads/2017/02/Movies.jpg";

function ShowMovies(movies, category) {
    category.innerHTML = '';
    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("row-5");
        movieEl.innerHTML = `
            <div class="movie-img">
                <img src="${movie.poster_path ? IMG_PATH + movie.poster_path : 
                   'error.jpg'}" alt="">
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
    const MOVIE_IMGS = document.querySelectorAll('.row-5 .movie-img');
    hoverReviewFilm(MOVIE_IMGS);
    window.addEventListener("resize", () => hoverReviewFilm(MOVIE_IMGS));
}

function ShowMovies_2row(movies, category) {
    category.innerHTML = '';
    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("row-2");
        movieEl.innerHTML = `
            <div class="movie-img">
                <img src="${movie.poster_path ? IMG_PATH + movie.poster_path : 
                    'error.jpg'}" alt="">
                <a href="">
                    <div class="hover-img">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </a>
                <div class="point-rate" style="background-color: ${getPointRate(movie.vote_average)};">${movie.vote_average}</div>
            </div>
            

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

// SEARCH 
var formSearch = document.getElementById("form-search");

formSearch.addEventListener("submit", function() {
    var searchText = document.getElementById("search-text").value;

    localStorage.setItem("searchValue", searchText);
});


// ADVERTISEMENT
async function getADs(url, category) {
    const resp = await fetch(url);
    
    const respData = await resp.json();
    
    ShowADs(respData.results, category);
    console.log(respData);
}

// getADs(URL_DISCOVER + API_KEY, AD_INFO);

function ShowADs(ads, category) {
    category.innerHTML = '';
    ads.forEach((ad) => {
        const ADEl = document.createElement("div");
        ADEl.classList.add("img-ad");
        ADEl.innerHTML = `        
            <img src="${IMG_PATH + ad.backdrop_path}" alt="">
            <a href="">
                ${ad.title}
            </a>
            <p class="description">${ad.overview}</p>
        `;
        category.appendChild(ADEl);
    });
}

function init() {
    // SLIDE_IMG[0] = 0%
    // SLIDE_IMG[1] = 100%
    // SLIDE_IMG[2] = 200%
    SLIDE_IMG.forEach((img, i) => {
        img.style.left = i * 100 + "%";

    });

    SLIDE_IMG[0].classList.add("active"); // thêm lớp active vào .img-ad
    // create Number of Advertisement
    createNumberAd();
}

init(); // gọi lại khi bỏ SLIDE_IMGS vào 

function createNumberAd() {
    for(let i = 0; i < numberOfImages; i++) {
        const NUM = document.createElement("li"); // Tạo 1 phần tử li 
        // NUM.classList.add("currentLi")
        NUM.innerText = i + 1; // set số cho thẻ li
        NUMBER_AD.appendChild(NUM); // bỏ phần tử trên vào ul

        NUM.addEventListener("click", () => {
            currentSlide = i;
            goToSlide(currentSlide);
        });
    }
    NUMBER_AD.children[0].classList.add("active");
}

// click right button 
NEXT_BTN.addEventListener("click", () => {
    currentSlide++;
    if(currentSlide == SLIDE_IMG.length) {
        currentSlide = 0;  
    }
    goToSlide(currentSlide);
});

// click left button 
PREV_BTN.addEventListener("click", () => {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = SLIDE_IMG.length - 1;  
    }
    goToSlide(currentSlide);
});

function goToSlide(slideNumber) {
    SLIDE_CONTAINER.style.transform = "translateX(-" + 100 * slideNumber + "%)";
    SLIDE_CONTAINER.style.transition = "transform 1.5s ease";

    setActiveClass();
}

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

function autoChangeSlide() {
    currentSlide++;
    if(currentSlide == SLIDE_IMG.length) {
        currentSlide = 0;  
    }
    goToSlide(currentSlide);
}

setInterval(autoChangeSlide, 5000);

// GET POSITION OF REVIEW FILM
function hoverReviewFilm(ITEMS) {
    ITEMS.forEach((mov) => {
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

// click to turn on/ off lightbulb

var url = ["url(backgroundBlack.jpg)",
    "url(backgroundWhite.jpg)"];
var i = 0;
var word_color = ["#fff","#000"];

$("body").toggleClass(localStorage.lightOff);

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

// Croll to top

$(window).scroll(function() {
    if($(this).scrollTop() > 2000) {
        $('#scroll-top').fadeIn();
    }
    else {
        $('#scroll-top').fadeOut();
    }
});

$('#scroll-top').click(function() {
    $("html, body").animate({scrollTop: 0}, 2000);
});