var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const crypto = require('crypto')
const hat = require('hat')
var router = express.Router();
var User = require('../../../models').User;


// Account Creation

router.post('/', function(req,res) {
  if (req.body.password === req.body.passwordConfirmation && req.body.email) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      User.create({
        email: req.body.email,
        passwordDigest: hash,
        apiKey: hat()
      })
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({"api_key": user.apiKey}));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
    });
  } else if (req.body.password !== req.body.passwordConfirmation) {
    res.status(401).send('Passwords do not match')
  } else {
    res.status(401).send("Invalid email")
  }
});


// function generateApiKey() {
//   crypto.randomBytes(32, (err, buf) => {
//     if (err) throw err;
//
//     console.log(buf.toString('hex'))
//     return buf.toString('hex');
//   })
// };

module.exports = router;
