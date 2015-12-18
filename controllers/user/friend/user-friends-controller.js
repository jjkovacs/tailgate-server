var express = require('express');
var Controller = require('../../Controller');
var RouteHandler = require('../../RouteHandler');
var userService = require('../../../business/user-service');

var baseUrl = '/user/:id/friend';
var handlers = [
  new RouteHandler('get', '/:friendshipId', GET),
  new RouteHandler('get', '', GETALL),
  new RouteHandler('post', '', CREATE),
  new RouteHandler('delete', '/:friendshipId', DELETE)
];

function GET(req, res) {
  var userId = req.params.id,
      friendshipId = req.params.friendshipId;
  
  try {
    var response = userService.getFriend(userId, friendshipId);
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

function GETALL(req, res) {
  var userId = req.params.id;
  
  try {
    var response = userService.getFriends(userId);
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
  var userId = req.params.id,
      friendId = req.body.id;
  
  try {
    var response = userService.addFriend(userId, friendId);
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

function DELETE(req, res) {
  var userId = req.params.id,
      friendshipId = req.params.friendshipId;
  
  try {
    var response = userService.deleteFriend(userId, friendshipId);
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

module.exports = new Controller(baseUrl, handlers);