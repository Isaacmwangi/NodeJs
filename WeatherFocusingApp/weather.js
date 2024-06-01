const apiKey = '92ade7b938e9862069d86bbeb202b57a'; //this my API key
const defaultLocation = 'Nyahururu'; //set default location to be nyahururu

const fetchWeather = async () => {
    const location = document.getElementById('location').value.trim();
    const weatherContainer = document.getElementById('weather');
    weatherContainer.textContent = '';

    const queryLocation = location || defaultLocation; // I want to use the default location of Nyahururu if no location is not provided at the input

    try {
        //this is to desplay the current weather
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryLocation}&appid=${apiKey}&units=metric`);
        const currentWeatherData = await currentWeatherResponse.json();

        if (!currentWeatherResponse.ok) {
            throw new Error('The Location you entered is not found');
        }
//this is to display the forecast for the next five days
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${queryLocation}&appid=${apiKey}&units=metric&cnt=40`);
        const forecastData = await forecastResponse.json();

        //handle error 
        if (!forecastResponse.ok) {
            throw new Error('The Location you entered is not found');
        }

        displayWeather(currentWeatherData, forecastData, weatherContainer);
    } catch (error) {
        weatherContainer.textContent = `Error: ${error.message}`;
    }
};

const displayWeather = (currentData, forecastData, weatherContainer) => {
    const cityName = currentData.name;

    const currentWeatherDiv = document.createElement('div');
    currentWeatherDiv.className = 'currentWeather';
    currentWeatherDiv.textContent = `${cityName}`;

    //images based on conditions
    const weatherIcon = document.createElement('img');
    const weatherCode = currentData.weather[0].icon; // Example: "01d" for clear day
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherCode}.png`;
    weatherIcon.alt = currentData.weather[0].main;
    currentWeatherDiv.appendChild(weatherIcon);
    
    const humidity = document.createElement('p');
    humidity.textContent = ` Humidity: ${currentData.main.humidity}%`;
    currentWeatherDiv.appendChild(humidity);


    const weatherDescription = document.createElement('p');
    weatherDescription.textContent = `${currentData.weather[0].description}`;
    currentWeatherDiv.appendChild(weatherDescription);

    
    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${currentData.main.temp}°C`;
    currentWeatherDiv.appendChild(temperature);



    weatherContainer.appendChild(currentWeatherDiv);

    const forecastDiv = document.createElement('div');
    forecastDiv.className = 'weatherContainer';

    const forecastList = document.createElement('div');
    forecastList.className = 'forecast';

    const uniqueDays = {};
    forecastData.list.slice(1).forEach(item => {
        const date = new Date(item.dt_txt).toDateString();
        if (!uniqueDays[date]) {
            uniqueDays[date] = item;
        }
    });

    for (const date in uniqueDays) {
        const item = uniqueDays[date];
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecastItem';
        
       
        const forecastIcon = document.createElement('img');
        const forecastCode = item.weather[0].icon;
        forecastIcon.src = `http://openweathermap.org/img/wn/${forecastCode}.png`;
        forecastIcon.alt = item.weather[0].main;
        forecastItem.appendChild(forecastIcon);
        
        
        //date
        const dateDiv = document.createElement('p');
        dateDiv.textContent = `${date}`;
        forecastItem.appendChild(dateDiv);
        
        //weather description
        const weatherDiv = document.createElement('p');
        weatherDiv.textContent = `${item.weather[0].description}`;
        forecastItem.appendChild(weatherDiv);

        //temperature division
        const tempDiv = document.createElement('p');
        tempDiv.textContent = `${item.main.temp}°C`;
        forecastItem.appendChild(tempDiv);
        


        forecastList.appendChild(forecastItem);
    }

    forecastDiv.appendChild(forecastList);
    weatherContainer.appendChild(forecastDiv);
};



// call the first function to fetch the wather location, specifically to the location
fetchWeather();