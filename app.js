//navigator options
var options = {
  timeout: 5000,
};

//weather api cal, celsius as default units
function getWeatherParams(lat, lon, units = "metric"){
  return {
    lat : lat,
    lon : lon,
    APPID:  'a40a4d710830fea15c9ff1e9b8f833cb',
    units: units 
  }
}

var getWeather = function(lat, lon) {
  weatherApiCall(lat, lon).done(function (response) {
    console.log(response);
    addCity(response.name);
    addCountry(response.sys);
    addTemperature(response.main);
    addWeather(response.weather[0]);
  }).fail(function(){

  });
}

function success(pos) {
  var crd = pos.coords;
  var lat = crd.latitude;
  var lon = crd.longitude;
  var params = getWeatherParams(lat, lon);

  getWeather(params);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
navigator.geolocation.getCurrentPosition(success, error, options);

function addCity(cityName) {
  $("#city").text(cityName);
}

function addCountry(sys) {
  $("#country").text(sys.country);
}

function addTemperature(temperatureObj) {
  $("#temperature").text(temperatureObj.temp + " °C");
}

function addWeather(weather){
  $("#weather-desc").text(weather.description);
}

function weatherApiCall(params){

  return $.ajax({
    async: "false",
    dataType : "json",
    type: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'http://api.openweathermap.org/data/2.5/weather',
    data : params,
    success: function(response) {
    },
    error: function() {
    }
  });
}

$(".unit-selector").on("click", function(){

var unit = this.value;
navigator.geolocation.getCurrentPosition(success, error, options);
});


