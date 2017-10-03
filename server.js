const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./models/signature.js')
const app = express();
const url = 'mongodb://localhost:27017/signatures';

//Mongoose connect
mongoose.connect(url, function (err, db) {
  if(err) {
    console.log('Unable to connect to the mongoDB server. Error:',
  err);
  } else {
    console.log('Connection established to', url)
  }
});

//Root directory

app.get('/', function(req, res) {
  res.json('you did it');
});

//Get all signatures

app.get('/api/signatures', function(req, res) {
  Signature.find({}).then(eachOne => {
    res.json(eachOne);
  });
});

//Post new signature

app.post('/api/signatures', function(req, res) {
  Signature.create({
    guestSignature: req.body.SignatureofGuest,
    message: req.body.MessageOfGuest,
  }).then(signature => {
    res.json(signature)
  });
});