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
        var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.query.location + "&key=" + process.env.GEOCODE_KEY;

        fetch(geocodeUrl)
        .then(response => {return response.json();})
        .then(result => {
          var lat = result.results[0].geometry.location.lat
          var lng = result.results[0].geometry.location.lng
          var forecastUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}?exclude=minutely,alerts,flags`;

          fetch(forecastUrl)
          .then((forecastResponse) => {
            return forecastResponse.json();
          })
          .then(forecastResult => {
            res.status(200).send(forecastResult)
          })
          .catch(err => { console.log(err) })
        })
       } else {
         res.setHeader("Content-Type", "application/json");
         res.status(401).send("Invalid Api Key");
      };
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send("Invalid Api Key");
  };
});

module.exports = router;
