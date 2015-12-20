var pg = require('pg'),
	q = require('q'),
	ps_getUser = require('../prepared-statements/user/get-user'),
	ps_createUser = require('../prepared-statements/user/create-user'),
	ps_updateUser = require('../prepared-statements/user/update-user'),
	ps_deleteUser = require('../prepared-statements/user/delete-user');

function UserDataProvider() {
	var self = this;
	
	// public methods
	
	self.getUser = getUser;
	self.createUser = createUser;
	self.updateUser = updateUser;
	self.deleteUser = deleteUser;
	
	// private implementation
	
	function getUser(id) {
	  	return ps_getUser(id)
	  		.then(function(results){
		  		return q.resolve(results.rows[0] || null);
  			});
	}
	
	function createUser(user) {
		return ps_createUser(user)
	  		.then(function(result){
		  		return q.resolve(result.rowCount);
  			});
	}
	
	function updateUser(user) {
		return ps_updateUser(user)
	  		.then(function(result){
		  		return q.resolve(result.rowCount);
  			});
	}
	
	function deleteUser(id) {
		return ps_deleteUser(id)
	  		.then(function(result){
		  		return q.resolve(result.rowCount);
  			});
	}
}

module.exports = new UserDataProvider();