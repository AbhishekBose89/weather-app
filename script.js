const apiKey = "b50f9d84a03819b9488e1a1b204e91e8";

const weatherDataEl = document.querySelector("#weather-data");
const cityInputEl = document.querySelector("#city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

const getWeatherData = async (cityValue) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img
						src="http://openweathermap.org/img/wn/${icon}.png"
						alt="weather-icon"
					/>`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = `${description}`

        weatherDataEl.querySelector(".details").innerHTML =
            details.map(detail => {
                return `<div>${detail}</div>`
            }).join("")

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";

        weatherDataEl.querySelector(".temperature").textContent = "";

        weatherDataEl.querySelector(".description").textContent = "An Error happened , Try again later"

        weatherDataEl.querySelector(".details").innerHTML = "";
    }
};
