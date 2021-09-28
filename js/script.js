// Store body
const contentHolder = document.querySelector('#contentHolder');
let firstUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let secondUrl = '&appid=66028e78387bb1565c400404dcbea69c';
let url = '';

const search = document.querySelector('#searchBox');
search.addEventListener('keypress', getQuery);

function getQuery(event) {
	if (event.keyCode == 13) {
		url = firstUrl + `${search.value}` + secondUrl;
		getWeather();
	}
}

let getWeather = async () => {
	const res = await fetch(url);
	const data = await res.json();
	displayResult(data);
	console.log(data);
};

function getDate(data) {
	const input = new Date(data * 1000);
	console.log(data);
	console.log(data * 1000);
	const day = input.getDay();
	const date = input.getDate();
	const month = input.getMonth();
	const year = input.getFullYear();

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	return `${days[day]}, ${date} ${months[month]} ${year}`;
}

function displayResult(weather) {
	let dateNow = getDate(weather.dt);
	let divContent = `
  <div class="container otherContent">
    <h2 id="cityName">${weather.name}</h2>
    <span id="date"><p>${dateNow}</p></span>
    <span id="climate">
      <img
        src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"
        alt=""
        srcset=""
      />
      <p id="imageTitle">${weather.weather[0].main}</p>
    </span>

    <h1 id="temp">${Math.floor(weather.main.temp - 273.15)}°C</h1>
    <p id="maxMinTemp">
      <span id="minTemp">${Math.floor(
				weather.main.temp_min - 273.15
			)}°C</span> /
      <span id="maxTemp">${Math.floor(weather.main.temp_max - 273.15)}°C</span>
    </p>
  </div>`;

	let body = document.getElementById('body');
	let mainWeather = weather.weather[0].main.toLowerCase();
	switch (mainWeather) {
		case 'clouds':
			body.style.color = 'white';
			body.style.backgroundImage = "url('/assets/seasonImages/cloudy.jpg')";
			break;
		case 'clear':
			body.style.backgroundImage = "url('/assets/seasonImages/clear.jpg')";
			break;
		case 'hail':
			body.style.color = 'white';
			body.style.backgroundImage = "url('/assets/seasonImages/hail.jpg')";
			break;
		case 'haze':
			body.style.backgroundImage = "url('/assets/seasonImages/haze.jpg')";
			break;
		case 'hurricane':
			body.style.backgroundImage = "url('/assets/seasonImages/hurricane.jpg')";
			break;
		default:
			body.style.backgroundImage = "url('/assets/seasonImages/haze.jpg')";
			break;
	}
	contentHolder.innerHTML = divContent;
}
