var sunriseTime;
var sunsetTime;


//alert("Make sure to enter your openWeather, IQ Air API keys as well as the location longitude and latitude as numbers (no letters and/or symbols)")


function start(){
    document.getElementById("activitesToDo").innerHTML = "";
    document.getElementById("bringItems").innerHTML = "";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${document.getElementById("latitude").value}&lon=${document.getElementById("longitude").value}&appid=${document.getElementById("openWeatherAPI").value}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].main;
            const temperature = Math.round(data.main.temp);
            const weatherDescription = data.weather[0].description;

            document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
            sunriseTime = new Date(data.sys.sunrise * 1000);
            sunsetTime = new Date(data.sys.sunset * 1000);
            document.getElementById("sunrise").innerHTML = `Sunrise 🌅 :  ${("0"+sunriseTime.getHours()).substr(-2)}:${("0"+sunriseTime.getMinutes()).substr(-2)}`;
            document.getElementById("sunset").innerHTML = `Sunset 🌇 :  ${("0"+sunsetTime.getHours()).substr(-2)}:${("0"+sunsetTime.getMinutes()).substr(-2)}`;
            console.log(data);
            if(data.main.feels_like <= 12){
                document.getElementById("bringItems").innerHTML += "Bring a jacket and maybe wear some leggings to keep you warm<br><br>";
                if(data.main.feels_like <= 9){
                    document.getElementById("bringItems").innerHTML += "Bring a scarf and gloves to keep you warm<br><br>Bring a heatpad in case if it's too cold<br><br>";
                }
            }else if(data.main.feels_like >= 26){
                document.getElementById("bringItems").innerHTML += "Keep it light on the clothing, it's gonna be hot<br><br>Bring some water to keep you cool<br><br>";
                document.getElementById("activitesToDo").innerHTML += "Stay inside and chill with the AC on!<br><br>";
                if(data.main.feels_like >= 31){
                    document.getElementById("bringItems").innerHTML += "Bring some iced drinks<br><br>Bring an electric fan<br><br>Be careful not to stay out for too long! Heat strokes are not nice<br><br>";
                    document.getElementById("activitesToDo").innerHTML += "Stay inside and chill with the AC on!<br><br>";
                }
            }else{
                document.getElementById("bringItems").innerHTML += "The temperature seems pretty nice, you should wear your best outfit!<br><br>";
            }
            if(data.weather[0].icon == "01d"){
                document.getElementById("bringItems").innerHTML += "Bring an umbrella, hat, and apply some sunscreen! Could be sunny!<br><br>";
            }else if(data.weather[0].icon == "09d"||data.weather[0].icon =="09n"||data.weather[0].icon =="10d"||data.weather[0].icon =="10n"||data.weather[0].icon =="11d"||data.weather[0].icon =="11n") {
                document.getElementById("bringItems").innerHTML += "Bring an umbrella, raincoat or a pair of boots! It'll be quite wet<br><br>";
            }if(data.weather[0].icon == "11d"||data.weather[0].icon =="11n") {
                document.getElementById("bringItems").innerHTML += "There's gonna be a thunderstorm! You should book a cab instead of walking.<br><br>";
            }else if(data.weather[0].icon == "13d" || data.weather[0].icon =="13n") {
                document.getElementById("bringItems").innerHTML += "Bring a pair of boots! There's gonna be snow!<br><br>";
            }
            if (document.getElementById("unitSystem").value == "metric"){
                document.getElementById("temp").innerHTML = `${temperature}ºC`;
                document.getElementById("lowtemp").innerHTML = `Low: ${Math.round(data.main.temp_min)}ºC`;
                document.getElementById("hightemp").innerHTML = `High: ${Math.round(data.main.temp_max)}ºC`;
                document.getElementById("feelslike").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}ºC`;
                document.getElementById("weather").innerHTML = `${weather}`;
                document.getElementById("imgweather").src = `img/${data.weather[0].icon}.svg`;
                document.getElementById("weatherdescription").innerHTML = `${String(weatherDescription).charAt(0).toUpperCase() + String(weatherDescription).slice(1)}`;
                document.getElementById("visibility").innerHTML = `Visibility: ${data.visibility}m`;
                document.getElementById("winddeg").innerHTML = `Wind: ${data.wind.deg}º`;
                document.getElementById("windspeed").innerHTML = `Speed: ${data.wind.speed} m/s`;
                document.getElementById("compassarrow").style.rotate = `${data.wind.deg}deg`;
                document.getElementById("location").innerHTML = `${data.name}, ${data.sys.country}`;
            }

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${document.getElementById("latitude").value}&lon=${document.getElementById("longitude").value}&appid=${document.getElementById("openWeatherAPI").value}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].main;
            const temperature = Math.round(data.main.temp);
            const weatherDescription = data.weather[0].description;

            if (document.getElementById("unitSystem").value == "imperial"){
                document.getElementById("temp").innerHTML = `${temperature}ºF`;
                document.getElementById("lowtemp").innerHTML = `Low: ${Math.round(data.main.temp_min)}ºF`;
                document.getElementById("hightemp").innerHTML = `High: ${Math.round(data.main.temp_max)}ºF`;
                document.getElementById("feelslike").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}ºF`;
                document.getElementById("weather").innerHTML = `${weather}`;
                document.getElementById("imgweather").src = `img/${data.weather[0].icon}.svg`;
                document.getElementById("weatherdescription").innerHTML = `${String(weatherDescription).charAt(0).toUpperCase() + String(weatherDescription).slice(1)}`;
                document.getElementById("visibility").innerHTML = `Visibility: ${data.visibility * 3.281}ft`;
                document.getElementById("winddeg").innerHTML = `Wind: ${data.wind.deg}º`;
                document.getElementById("windspeed").innerHTML = `Speed: ${data.wind.speed} mph`;
                document.getElementById("compassarrow").style.rotate = `${data.wind.deg}deg`;
                document.getElementById("location").innerHTML = `${data.name}, ${data.sys.country}`;
            }

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

    fetch(`https://api.airvisual.com/v2/nearest_city?lat=${document.getElementById("latitude").value}&lon=${document.getElementById("longitude").value}&key=${document.getElementById("iqAirAPI").value}`)
        .then(response => response.json())
        .then(data => {
            if(document.getElementById("aqiUnit").value=="aqius"){
                document.getElementById("aqiType").innerHTML = "U.S. AQI";
                document.getElementById("aqi").innerHTML = `${data.data.current.pollution.aqius}`;
            }
            if(document.getElementById("aqiUnit").value=="aqicn"){
                document.getElementById("aqiType").innerHTML = "CN AQI";
                document.getElementById("aqi").innerHTML = `${data.data.current.pollution.aqicn}`;
            }

            if (data.data.current.pollution.aqius <=50){
                document.getElementById("healthinessaqi").innerHTML = "Healthy";
                document.getElementById("aqibox").style.backgroundColor = "#0d541e";
            }else if(data.data.current.pollution.aqius <= 100){
                document.getElementById("healthinessaqi").innerHTML = "Decent";
                document.getElementById("aqibox").style.backgroundColor = "#0d1254";
            }else if(data.data.current.pollution.aqius <= 150){
                document.getElementById("healthinessaqi").innerHTML = "Moderate risk";
                document.getElementById("aqibox").style.backgroundColor = "#54450d";
            }else if(data.data.current.pollution.aqius <= 200){
                document.getElementById("healthinessaqi").innerHTML = "Unhealthy";
                document.getElementById("aqibox").style.backgroundColor = "#54220d";
            }else if(data.data.current.pollution.aqius <= 100){
                document.getElementById("healthinessaqi").innerHTML = "Extremely Unhealthy";
                document.getElementById("aqibox").style.backgroundColor = "#540d0d";
            }else if(data.data.current.pollution.aqius <= 100){
                document.getElementById("healthinessaqi").innerHTML = "Hazardous";
                document.getElementById("aqibox").style.backgroundColor = "#3f0d54";
            }
            if(data.data.current.pollution.aqius > 100) {
                document.getElementById("bringItems").innerHTML += "Bring a face mask! The air quality outside isn't looking very good...<br><br>";
            }
            if(data.data.current.pollution.aqius <= 100 && 8 <= data.data.current.weather.tp <= 21 &&
                ["01d.svg", "01n.svg", "02d.svg", "02n.svg", "03d.svg", "03n.svg", "04d.svg", "04n.svg"].includes(
                    document.getElementById("imgweather").src.split("/").pop()
                )) {
                document.getElementById("activitesToDo").innerHTML += "Go on a sightseeing stroll outside! Seems like the weather's really sweet, and the air is fresh<br><br>";
                console.log("test");
            }else if(data.data.current.pollution.aqius <= 100 && 8 <= data.data.current.weather.tp <= 21 &&
                ["09d.svg", "09n.svg", "10d.svg", "10n.svg", "11d.svg", "11n.svg"].includes(
                    document.getElementById("imgweather").src.split("/").pop()
                )) {
                document.getElementById("activitesToDo").innerHTML += "Seems to be quite rainy, you should go on an umbrella walk or sit under a balcony and enjoy the raindrops fall and the distant thunder.<br><br>";
            }else if(data.data.current.pollution.aqius <= 100 && ["13d.svg","13n.svg"].includes(
                document.getElementById("imgweather").src.split("/").pop()
            )) {
                document.getElementById("activitesToDo").innerHTML += "Enjoy the snow! Maybe catch some snowflakes or get into snowball fights?<br><br>";
            }else if(data.data.current.pollution.aqius <= 100 && data.data.current.tp >= 26 &&
                ["01d.svg", "01n.svg", "02d.svg", "02n.svg", "03d.svg", "03n.svg", "04d.svg", "04n.svg"].includes(
                document.getElementById("imgweather").src.split("/").pop()
            )) {
                document.getElementById("activitesToDo").innerHTML += "Go to your local outdoors swimming pool or the beach!<br><br>";
            }else if(data.data.current.pollution.aqius <= 100 && data.data.current.tp >= 26) {
                document.getElementById("activitesToDo").innerHTML += "Go to your local indoors pool!<br><br>";
            }else{
                document.getElementById("activitesToDo").innerHTML += "Let's take a day to stay inside!<br><br>";
            }
            console.log(data);

        })

        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

}

function updateTime() {
    let dateTime_now = new Date();
    let timeString = dateTime_now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let timeElement = document.getElementById("time");
    if (timeElement) {
        timeElement.innerHTML = timeString;
    } else {
        console.error("Element with ID 'time' not found!");
    }
}

document.addEventListener("DOMContentLoaded", setInterval(updateTime, 1000));

