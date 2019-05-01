var express = require('express');
var router = express.Router();
var pry = require('pryjs');
var fetch = require('node-fetch');

// var Forecast = require('../../../models').Forecast;

// City Forecast
router.get('/', function(req, res) {
  var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.query.location + "&key=" + process.env.GEOCODE_KEY;

  fetch(geocodeUrl)
  .then((response) => {return response.json()};)
  .then(result => {
    var lat = result.results[0].geometry.lat
    var lng = result.results[0].geometry.lng

    forecastUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY'}/${lat},${lng}?exclude=minutely,alerts,flags`

    fetch(forecastUrl)
    .then(response) => {response.json();}
  })
  .catch(err => { console.log(err) })
})


module.exports = router;
