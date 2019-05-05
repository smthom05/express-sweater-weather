var express = require('express');
var router = express.Router();
var pry = require('pryjs');
var fetch = require('node-fetch');
var User = require('../../../models').User;
// var Forecast = require('../../../models').Forecast;

// City Forecast
router.get('/', function(req, res) {
  if (req.body.api_key) {
    User.findOne({
      where: {
        apiKey: req.body.api_key
      }
    })
    .then(user => {
      if (user !== null) {
        getGeocodeData(req.query.location)
        .then(response => {
          getForecastData(response)
          .then(forecastResult => {
            res.status(200).send(forecastResult)
          })
          .catch(err => { res.send({err})})
        })
       } else {
         res.setHeader("Content-Type", "application/json");
         res.status(401).send("Invalid Api Key");
      };
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send("Invalid Api Key");
  };
});


// Helper Functions

function getGeocodeData(location) {
  var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + process.env.GEOCODE_KEY;

  return fetch(geocodeUrl)
  .then(response => {
    return response.json();
  }).then(result => {
    var lat = result.results[0].geometry.location.lat
    var lng = result.results[0].geometry.location.lng
    return forecastUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}?exclude=minutely,alerts,flags`;
  });
};

function getForecastData(url) {
  return fetch(url)
  .then((forecastResponse) => {
    return forecastResponse.json();
  });
};

module.exports = router;
