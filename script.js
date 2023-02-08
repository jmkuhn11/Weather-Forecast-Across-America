const kuhnApiKey = "af7ea6843cd5a856286c86406aed3dca";
var btn = document.getElementById('submitBtn');
var cityHistoryDiv = document.getElementById('cityHistory');
var key = "cityName";
var cityArray = JSON.parse(localStorage.getItem(key)) || [];

/*
var cityArray = [];
var val = localStorage.getItem(key);
if (val = null) {
    alert("cityArray is null");
    cityArray = [];
} else {
    alert("cityArray is NOT null");
    cityArray = JSON.parse(val);
}
*/

function weatherSearch() {
    var city = document.getElementById('cityName').value;
    getWeatherForCity(city);

    //getLatAndLon(city);

    console.log(city);

    //alert("cityArray:" + cityArray);
    cityArray.push(city);

    localStorage.setItem(key, JSON.stringify(cityArray));

    //alert("city" + city);
    //localStorage.setItem(city, city);

    //cityArray = JSON.parse(localStorage.getItem(key));

    displayHistory();
}

function displayHistory() {
    cityHistoryDiv.textContent = '';

    /*
    var keys = Object.keys(localStorage);
    alert("length" + keys.length);

    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var city = localStorage.getItem(key);
        var button = document.createElement("button");
        button.style.backgroundColor = "gray";
        button.style.margin = "5px";
        document.body.appendChild(button);
        button.innerText = city;
        button.addEventListener("click", () => {getWeatherForCity(city)});
        cityHistoryDiv.appendChild(button);
    }
    */

    
    /*
    keys.forEach(key=>(function(key) {

        alert("for");

        var city = localStorage.getItem(key);
        var button = document.createElement("button");
        button.style.backgroundColor = "gray";
        button.style.margin = "5px";
        document.body.appendChild(button);
        button.innerText = city;
        button.addEventListener("click", () => {getWeatherForCity(city)});
        cityHistoryDiv.appendChild(button);
    }))
    */




    
    if (cityArray != null) {
        cityArray.forEach(function(city) {
            var button = document.createElement("button");
            button.style.backgroundColor = "gray";
            button.style.margin = "5px";
            document.body.appendChild(button);
            button.innerText = city;
            button.addEventListener("click", () => {getWeatherForCity(city)});
            cityHistoryDiv.appendChild(button);
        })
    }
    
}

btn.addEventListener("click", weatherSearch);

displayHistory();


/*function getLatAndLon(city) {
    var latLonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + kuhnApiKey;

    fetch(latLonUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (latLonRes) {
            var lat = latLonRes[0].lat;
            var lon = latLonRes[0].lon;
            getWeather(lat, lon);
            //alert(retArray[0]);
            //alert(retArray[1]);
            //return latlonArray;
        })
        .catch(function (error) {
            console.error(error);
        });

}


function getWeather(lat, lon) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" + "lon=" + lon + "&appid=" + kuhnApiKey;

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (weatherRes) {
            var weatherArray = weatherRes.list;

            var oldDate = weatherArray[0].dt_txt.split(" ")[0];
            alert(oldDate);
        })
        .catch(function (error) {
            //console.error(error);
        });

}*/




function getWeatherForCity(city) {

    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + kuhnApiKey;

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (weatherRes) {
            var weatherArray = weatherRes.list;

            var oldDate = weatherArray[0].dt_txt.split(" ")[0];
            var newDate;
            var weatherHTML = "<table><tr><td colspan='5'>";
            weatherHTML += "<table border='1'>";
            weatherHTML += "<tr><td>" + city + " (" + oldDate + ")<img src='http://openweathermap.org/img/wn/" + weatherArray[0].weather[0].icon + ".png'></img></td></tr>";
            weatherHTML += "<tr><td>Temp: " + weatherArray[0].main.temp + "&#176;F</td></tr>";
            weatherHTML += "<tr><td>Wind: " + weatherArray[0].wind.speed + " MPH </td></tr>";
            weatherHTML += "<tr><td>Humidity: " + weatherArray[0].main.humidity + "%</td></tr>";
            weatherHTML += "</table>";
            weatherHTML += "</td></tr><tr><td colspan='5'>5-Day Forecast:</td></tr><tr>";

            for (let i = 0; i < weatherArray.length; i++) {

                newDate = weatherArray[i].dt_txt.split(" ")[0];

                if (oldDate != newDate) {
                    weatherHTML += "<td><table border='1'>";
                    weatherHTML += "<tr><td>" + newDate + "</td></tr>";
                    weatherHTML += "<tr><td><img src='http://openweathermap.org/img/wn/" + weatherArray[i].weather[0].icon + ".png'></img></td></tr>";
                    weatherHTML += "<tr><td>Temp: " + weatherArray[i].main.temp + "&#176;F</td></tr>";
                    weatherHTML += "<tr><td>Wind: " + weatherArray[i].wind.speed + " MPH </td></tr>";
                    weatherHTML += "<tr><td>Humidity: " + weatherArray[i].main.humidity + "%</td></tr>";
                    weatherHTML += "</table></td>";

                    oldDate = newDate;
                }
            }
            document.getElementById("weatherDiv").innerHTML = weatherHTML;

            /* write query to page so user knows what they are viewing
            resultTextEl.textContent = locRes.search.query;
      
            console.log(locRes);
      
            if (!locRes.results.length) {
              console.log('No results found!');
              resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
              resultContentEl.textContent = '';
              for (var i = 0; i < locRes.results.length; i++) {
                printResults(locRes.results[i]);
              }
            }*/
        })
        .catch(function (error) {
            console.error(error);
        });
}