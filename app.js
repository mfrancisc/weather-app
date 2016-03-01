//navigator options
var options = {
  timeout: 5000,
};

var position = function() {
  this.lat = "";
  this.lon = "";
}

//weather api cal, celsius as default units
function getWeatherParams(position, units = "metric"){
  return {
    lat : position.lat,
    lon : position.lon,
    APPID:  'a40a4d710830fea15c9ff1e9b8f833cb',
    units: units 
  }
}

var getWeather = function(params) {
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  weatherApiCall(params, weatherUrl).done(function (response) {
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
  position.lat = crd.latitude;
  position.lon = crd.longitude;
  var params = getWeatherParams(position);

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
  var desc = $(".unit-selector.active").attr("data");
  $("#temperature").text(Math.round(temperatureObj.temp) + " °" + desc);
}

function addWeather(weather){
  $("#weather-desc").text(weather.description);
  addWeatherIcon(weather.icon);
}

function addWeatherIcon(iconId){
  var iconUrl = "http://openweathermap.org/img/w/"+iconId+ ".png"
    $("#weather-img").attr("src", iconUrl);
}

function weatherApiCall(params, url, origin = ""){
  return $.ajax({
    async: "false",
    dataType : "json",
    type: "GET",
    contentType: "application/x-www-form-urlencoded; charset=utf-8", 
    headers: {
      "Accept" : "application/json, image/png",
    },
    url: url,
    data : params,
    success: function(response) {
    },
    error: function() {
    }
  });
}

$(".unit-selector").on("click", function(){
  var unit = this.value;
  var params = getWeatherParams(position, unit); 
  params.unitDesc = this.getAttribute("data");
  getWeather(params);

  //remove active previous button
  $(".unit-selector.active").removeClass("active");
  //add active to pressed button
  $(this).addClass("active");
});


