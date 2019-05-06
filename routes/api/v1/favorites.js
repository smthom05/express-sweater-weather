var express = require('express');
var router = express.Router();
var pry = require('pryjs');
var User = require('../../../models').User;
var Favorite = require('../../../models').Favorite;
var City = require('../../../models').City;

// Create Favorite
router.post('/', function(req,res) {
  if (req.body.api_key) {
    User.findOne({
      where: {
        apiKey: req.body.api_key
      }
    })
    .then(user => {
      if (user !== null) {
        City.findOrCreate({ where: {name: req.body.location}})
        .then(city => {
          Favorite.findOrCreate({
            where: {
              UserId: user.dataValues.id,
              CityId: city[0].dataValues.id
            }
          })
          .then(favorite => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify({"message":`${city[0].dataValues.name} has been added to your favorites`}));
          })
        })
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({"message": "Invalid API Key"}));
      };
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({"message": "Invalid API Key"}));
  };
});

// Listing Favorites
router.get('/', function(req,res) {
  if (req.body.api_key) {
    User.findOne({
      where: {
        apiKey: req.body.api_key
      }
    })
    .then(user => {
      if (user !== null) {
        Favorite.findAll({where: {UserId: user.id}})
        .then(favorites => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(favorites));
        })
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({"message": "Invalid API Key"}));
      }
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({"message": "Invalid API Key"}));
  };
});

// Deleting Favorite
router.delete('/', function(req,res) {
  if (req.body.api_key) {
    User.findOne({
      where: {
        apiKey: req.body.api_key
      }
    })
    .then(user => {
      if (user !== null) {
        City.findOne({
          where: {
            name: req.body.location
          }
        })
        .then(city => {
          if (city) {
            Favorite.destroy({
              where: {
                UserId: user.id,
                CityId: city.id
              }
            })
            .then(favorite => {
              res.setHeader("Content-Type", "application/json");
              res.status(204).send(JSON.stringify({"message": "Favorite has been deleted."}));
            });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.status(401).send(JSON.stringify({"message": "Favorite Not Found."}));
          }
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({"message": "Invalid API Key"}));
      }
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({"message": "Invalid API Key"}));
  };
});

module.exports = router;
