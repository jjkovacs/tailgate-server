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
  
  try {
    var response = userService.getUser(userId);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  
  if(!response) {
    res.sendStatus(404);
    return;
  }
  
  res.json(response);
}

function CREATE(req, res) {
  var user = req.body;
  
  try {
    var response = userService.addUser(user);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
  
  if(!response) {
    res.sendStatus(500);
    return;
  }
  
  res.json(response);
}

function UPDATE(req, res) {
  var userId = req.params.id,
      user = req.body;
  
  try {
    userService.updateUser(userId, user);
  } catch(error) {
    console.log(error);
    res.sendStatus(500); //TODO: update this to send a 404 if the userId doesn't exist
    return;
  }
}

function DELETE(req, res) {
  var userId = req.params.id;
  
  try {
    userService.deleteUser(userId);
  } catch(error) {
    console.log(error);
    res.sendStatus(500); //TODO: update this to send a 404 if the userId doesn't exist
    return;
  }
}

module.exports = new Controller(baseUrl, handlers);