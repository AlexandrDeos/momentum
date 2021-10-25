import playList from './playList.js';
console.log(playList);

const time = document.querySelector('.time');
const firstDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-prev');
const slidePrev = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const playBtn = document.querySelector('.play');
const audio = new Audio();
const quotes = [
  { 
   "quote" : "The only thing we have to fear is fear itself", 
   "author" : "Franklin D. Roosevelt" 
  },
  {
   "quote" : "The truth will set you free", 
   "author" : "the Bible"
  },
  {
   "quote" : "Three can keep a secret, if two of them are dead", 
   "author" : "Benjamin Franklin"
  },
  {
    "quote" : "I have always depended on the kindness of strangers", 
    "author" : "Blanche Dubois"
   },
   {
    "quote" : "If at first you don’t succeed, try, try again", 
    "author" : "W. E. Hickson"
   },
   {
    "quote" : "If you want something done right, do it yourself", 
    "author" : "Charles-Guillaume Étienne"
   },
   {
    "quote" : "If you want something said, ask a man; if you want something done, ask a woman", 
    "author" : "Margaret Thatcher"
   }
 ];

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    time.textContent = currentTime;
    showDate();
  };

  showTime();
  


function showDate() {
   const lastDate = new Date();
   const options = {weekday: 'long',month: 'long', day: 'numeric', timeZone: 'UTC',};
    const currentDate = lastDate.toLocaleDateString('en-US', options);
    firstDate.textContent = currentDate;  
};

// Greeting

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
    if (hours < 6 ) {
      return 'night';
    } else if (hours < 12) {
      return 'morning';
    } else if (hours < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }



function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const timeOfDayUpper = timeOfDay[0].toUpperCase() + timeOfDay.slice(1);
  
  greeting.textContent = `Good ${timeOfDayUpper}`;
}

showGreeting();

// NameSave
function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage);


// Images-Slider

  function getRandomNum(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
      }
  getRandomNum(1, 21);


  function setBg() {
  const randomNumToString =  getRandomNum(1, 21).toString();

  const bgNum = randomNumToString.padStart(2, '0');
  console.log(bgNum)
  body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg)`;
}

setBg();

// sliderButton

function getSlideNext() {

  setBg()
}
slideNext.addEventListener('click', getSlideNext);



function getSlidePrev() {

  setBg()
}
slidePrev.addEventListener('click', getSlidePrev);



// Weather

async function getWeather() {
  try {
      getCityStorage();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=890b6a96548a381b7d9e68852a9dd6cf&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherError.textContent = '';
  } catch (err) {
      weatherError.textContent = '%!$Incorrect^(!';
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      windSpeed.textContent = '';
      humidity.textContent = '';
  }
}
getWeather()
city.addEventListener('сhange', getWeather);

// Local storage


function setCityStorage() {
  localStorage.setItem('city', city.value);
}
city.addEventListener('change', setCityStorage);

function getCityStorage() {
  if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
  } 
  else {
      city.value = "Minsk"
  }
}
window.addEventListener('load', getLocalStorage);

// Quotes

function randomQuote() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  quote.textContent = `"${random.quote}."`;
  author.textContent = random.author;
};

randomQuote();
changeQuote.addEventListener("click", randomQuote);


//New AudioPlayer

function playAudio() {
  audio.src = playList[0].src;
  audio.currentTime = 0;
  audio.play();
};

playBtn.addEventListener('click', playAudio);

