const searchBtn = document.getElementById('search-btn');
        const weatherInfo = document.getElementById('weather-info');

        searchBtn.addEventListener('click', () => {
            const city = document.getElementById('city').value.trim();
            if (city === '') {
                weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
                return;
            }

            const xhr = new XMLHttpRequest();
            const apiKey = 'c5149b2f86509d50231a4608e89759b5';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    weatherInfo.innerHTML = `
                        <p>City: ${data.name}</p>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                    `;
                } else {
                    weatherInfo.innerHTML = '<p>City not found. Please try again.</p>';
                }
            };

            xhr.onerror = function () {
                weatherInfo.innerHTML = '<p>Unable to fetch weather information. Please try again later.</p>';
            };

            xhr.send();
        });