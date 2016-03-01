//navigator options
var options = {
  timeout: 5000,
};

var position = function() {
  this.city = "";
}

//weather api cal, celsius as default units
function getWeatherParams(city, units){
  return {
    q : city,
    APPID:  'a40a4d710830fea15c9ff1e9b8f833cb',
    units: units 
  }
}

var getWeather = function(params) {
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  weatherApiCall(params, weatherUrl).done(function (response) {
    addTemperature(response.main);
    addWeather(response.weather[0]);
  }).fail(function(){

  });
}

function getLocalWeather(){
var ipInfoUrl = "http://ipinfo.io/json";
  weatherApiCall({}, ipInfoUrl).done(function (response) {
    position.city = response.city;
    addCity(response.city + ' (' + response.postal + ')');
    addRegion(response.region);
    addCountry(response.country);
    var units = "metric";
  var params = getWeatherParams(response.city, units);
  getWeather(params);
  });
}
getLocalWeather();

function addCity(cityName) {
  $("#city").text(cityName);
}

function addRegion(region) {
  $("#region").text(region);
}

function addCountry(country) {
  $("#country").text(country);
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

function weatherApiCall(params, url){
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
  var params = getWeatherParams(position.city, unit); 
  params.unitDesc = this.getAttribute("data");
  getWeather(params);

  //remove active previous button
  $(".unit-selector.active").removeClass("active");
  //add active to pressed button
  $(this).addClass("active");
});


