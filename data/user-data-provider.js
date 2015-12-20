var pg = require('pg'),
	q = require('q'),
	ps_getUser = require('../prepared-statements/user/get-user');

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
		throw new Error('Not Implemented');
	}
	
	function updateUser(user) {
		throw new Error('Not Implemented');
	}
	
	function deleteUser(id) {
		throw new Error('Not Implemented');
	}
}

module.exports = new UserDataProvider();