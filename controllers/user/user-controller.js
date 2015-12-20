var express = require('express');
var Controller = require('../Controller');
var RouteHandler = require('../RouteHandler');
var userService = require('../../business/user-service');

var baseUrl = '/user';
var handlers = [
  new RouteHandler('get', '/:id', GET),
  new RouteHandler('post', '', CREATE),
  new RouteHandler('post', '/:id', UPDATE),
  new RouteHandler('delete', '/:id', DELETE)
];

function GET(req, res) {
  var userId = req.params.id;
  
  userService.getUser(userId)
    .then(function(response){
      if(response) {
        res.json(response);
      } else {
        res.sendStatus(404);
      }
    }, function(error){
      console.error(error);
      res.sendStatus(500);
    });
}

function CREATE(req, res) {
  var user = req.body;
  
  console.log(req.body);
  
  userService.createUser(user)
    .then(function(response){
      console.log('response', response);
      if(response === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    }, function(error){
      console.error(error);
      res.sendStatus(500);
    });
}

function UPDATE(req, res) {
  var userId = req.params.id,
      user = req.body;
      
  user.id = userId;
  
  userService.updateUser(user)
    .then(function(response){
      if(response === 1) {
        res.sendStatus(200);
      } else if(response === 0) {
        res.sendStatus(404);
      }
    }, function(error){
      console.error(error);
      res.sendStatus(500);
    });
}

function DELETE(req, res) {
  var userId = req.params.id;
  
  userService.deleteUser(userId)
    .then(function(response){
      if(response >= 1) {
        res.sendStatus(200);
      } else if(response === 0) {
        res.sendStatus(404);
      }
    }, function(error){
      console.error(error);
      res.sendStatus(500);
    });
}

module.exports = new Controller(baseUrl, handlers);