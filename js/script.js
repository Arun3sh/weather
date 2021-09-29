// Store body
const contentHolder = document.querySelector('#contentHolder');
let firstUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let secondUrl = '&appid=66028e78387bb1565c400404dcbea69c';
let url = '';

//To get the search value
const search = document.querySelector('#searchBox');

// Eventlistner to give values if enter is pressed
search.addEventListener('keypress', getQuery);

// To check if enter is pressed
function getQuery(event) {
	if (event.keyCode == 13) {
		//url = firstUrl + `${search.value}` + secondUrl;
		getUrl();
	}
}

// to set a final url by assing city name
let getUrl = () => {
	url = firstUrl + `${search.value}` + secondUrl;
	getWeather();
};

// Fetching the data
let getWeather = async () => {
	const res = await fetch(url);
	const data = await res.json();
	try {
		displayResult(data);
	} catch (error) {
		if (data.message == 'city not found') {
			let err = `<div class="container" id="errorContent" style="color: red;">City Not Found</div>`;
			contentHolder.innerHTML = err;
		}
	}
};

// To get the date in user readable format
function getDate(data) {
	const input = new Date(data * 1000);

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

// To display the weather details in dynamically created div
function displayResult(weather) {
	let dateNow = getDate(weather.dt);
	let divContent = `
  <div class="container otherContent">
    <h2 id="cityName">${weather.name}</h2>
    <span id="date"><p>${dateNow}</p></span>
    <span id="climate">
      <img
        src="/assets/seasonIcons/${weather.weather[0].icon}@2x.png"
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

	// To change the background image dynamically based the current weather
	let body = document.getElementById('body');
	let mainWeather = weather.weather[0].main.toLowerCase();
	switch (mainWeather) {
		//Clouds
		case 'clouds':
		case 'cloudy':
			body.style.color = 'white';
			body.style.backgroundImage = "url('/assets/seasonImages/cloudy.jpg')";
			break;

		// Clear weather
		case 'clear':
			body.style.backgroundImage = "url('/assets/seasonImages/clear.jpg')";
			break;

		// Hail weather
		case 'hail':
			body.style.color = 'white';
			body.style.backgroundImage = "url('/assets/seasonImages/hail.jpg')";
			break;

		// Haze mist dusty fog smoke sand tornado
		case 'haze':
		case 'mist':
		case 'fog':
		case 'dust':
		case 'sand':
		case 'tornado':
			body.style.color = 'white';
			body.style.backgroundImage = "url('/assets/seasonImages/haze.jpg')";
			break;

		// Hurricane
		case 'hurricane':
			body.style.backgroundImage = "url('/assets/seasonImages/hurricane.jpg')";
			break;

		// Thinderstrom
		case 'thunderstrom':
			body.style.backgroundImage =
				"url('/assets/seasonImages/thunderStrom.jpg')";
			break;

		// Snow
		case 'snow':
			body.style.backgroundImage = "url('/assets/seasonImages/snow.jpg')";
			break;

		default:
			body.style.backgroundImage = "url('/assets/seasonImages/haze.jpg')";
			break;
	}
	contentHolder.innerHTML = divContent;
}
