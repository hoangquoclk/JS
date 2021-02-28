const daysEL = document.getElementById('days');
const hoursEL = document.getElementById('hours');
const minsEL = document.getElementById('mins');
const secondsEL = document.getElementById('seconds');

const NEWYEARS = '1 Jan 2022';

function countDown() {
    const NEWYEARSTIME = new Date(NEWYEARS);
    const CURRENTTIME = new Date();

    const TOTALSECONDS = (NEWYEARSTIME - CURRENTTIME) / 1000;

    const SECONDS = Math.floor(TOTALSECONDS % 60);
    const MINS = Math.floor(TOTALSECONDS / 60 % 60);
    const HOURS = Math.floor(TOTALSECONDS / 3600 % 24);
    const DAYS = Math.floor(TOTALSECONDS / 3600 / 24);
    
    daysEL.innerHTML = formatTime(DAYS);
    hoursEL.innerHTML = formatTime(HOURS);
    minsEL.innerHTML = formatTime(MINS);
    secondsEL.innerHTML = formatTime(SECONDS);
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

countDown();

setInterval(countDown, 1000);