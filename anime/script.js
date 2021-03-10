const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=276dac7f6ba919bdfd9d956cdcbd3d37&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const API_KEY = "276dac7f6ba919bdfd9d956cdcbd3d37";

const CHERVON_CLICK = document.querySelector('fa-chevron-left');
const AD_INFO = document.querySelectorAll('ad-info');
const SLIDE_IMG = document.querySelectorAll('.img-ad');
const SLIDE_CONTAINER = document.querySelector('.ad-info');
const NEXT_BTN = document.querySelector('.fa-chevron-right');
const PREV_BTN = document.querySelector('.fa-chevron-left');
const NUMBER_AD = document.querySelector('.number-ad');
const MOVIE_IMGS = document.querySelectorAll('.row-5 .movie-img');
const LIGHTBULB = document.querySelector('.fa-lightbulb');

let numberOfImages = SLIDE_IMG.length;
// let slideWidth = SLIDE_IMG[0].clientWidth; // xét độ rộng của phần tử đầu tiên
let currentSlide = 0;

const fa_bar_icon = document.querySelector('.fa-bars');

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
}

getMovies(APIURL);

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

init();

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
function hoverReviewFilm () {
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

var url = ["url(https://wallpaperaccess.com/full/400195.jpg)",
    "url(https://img.freepik.com/free-vector/white-background-with-triangle-patterns_1017-18410.jpg?size=626&ext=jpg)"];
var i = 0;


LIGHTBULB.addEventListener("click", () => {
    document.querySelectorAll(".menu .menu-list li a").forEach((menu) => {
        menu.classList.toggle("white");
    });

    if(i == url.length) {
        i = 0;
    }

    document.querySelector(".account").classList.toggle("white");
    document.querySelector(".day-night").classList.toggle("white");
    document.querySelector("body").style.background = url[i];
    i++;
});