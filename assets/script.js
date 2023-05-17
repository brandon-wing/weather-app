const APIkey = 'c0e1f4a38c97c4f0d56bc4b502970cd4';
const cityInput = document.getElementById('city-search');

//when search button is clicked or enter is presses, the fetch request occures
function handleFormSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeatherDaily(city);
    cityInput.value = '';
  }
}
document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

function getWeatherDaily(city) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;

  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        //see the response in the console
      console.log(data);
    })
}



