const APIkey = 'c0e1f4a38c97c4f0d56bc4b502970cd4';
const cityInput = document.getElementById('city-search');
const currentWeatherEl = document.getElementById('current-weather');
const searchHistoryEl = document.getElementById('history-list')
let localStorageList = []

function saveSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('localStorageList')) || []
    if (!history.includes(city)) {
      history.push(city);
      localStorage.setItem('localStorageList', JSON.stringify(history));
    }
  }
  
  // Update the makeHistoryList function
  function makeHistoryList() {
    const historyList = JSON.parse(localStorage.getItem('localStorageList')) || []
    historyList.forEach((citySaved) => {
      const list = document.createElement('button');
      list.textContent = citySaved;
      list.addEventListener('click', () => {
        getWeather(citySaved);
      });
      searchHistoryEl.appendChild(list);
    });
  }
// call it so the list shows when the page is loaded
makeHistoryList();

//when search button is clicked or enter is presses, the fetch request occures
function handleFormSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    saveSearchHistory(city);
    makeHistoryList();
    cityInput.value = '';
  }
}
document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

function getWeather(city) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;

  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        const lat = data.coord.lat
        const lon = data.coord.lon
        const name = data.name
        const wind = data.wind.speed
        const humidity = data.main.humidity
        const date = data.dt
        const high = data.main.temp_max
        const low = data.main.temp_min
        const icon = data.weather[0].icon
        //see the response in the console
        let formattedDate = dayjs.unix(date).format('MM/DD/YY')
        const currentWeatherHTML = `
        <h3>${name}</h3>
        <p>Date: ${formattedDate}</p>
        <p>Temperature: ${high}°F / ${low}°F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${wind} mph</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
      `
      //set the contents of the daily weather HTML as shown above
        currentWeatherEl.innerHTML = currentWeatherHTML
        getFiveDays(lat, lon)
      console.log(data);
    })

}

function getFiveDays(lat, lon) {
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
  
    fetch(requestURL)
      .then(response => response.json())
      .then(data => {
        const futureConditions = data.list;
  
        let fiveCards = '';
        for (let i = 7; i < futureConditions.length; i += 8) {
          let forecast = futureConditions[i];
          let temp = forecast.main.temp;
          let humidity = forecast.main.humidity;
          let wind = forecast.wind.speed;
          let date = forecast.dt;
          let icon = forecast.weather[0].icon;
          let formattedDate = dayjs.unix(date).format('MM/DD/YY');
          const forecastCard = `
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${formattedDate}</h5>
                  <p class="card-text">Temperature: ${temp}°F</p>
                  <p class="card-text">Wind: ${wind}°F</p>
                  <p class="card-text">Humidity: ${humidity}°F</p>
                  <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
                </div>
              </div>
            </div>
          `;
  
          fiveCards += forecastCard;
        }
  
        const forecastCardsContainer = document.getElementById('forecast-cards');
        forecastCardsContainer.innerHTML = fiveCards;
  
        console.log(data);
      });
  }
  
  


