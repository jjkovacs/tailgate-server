var userDataProvider = require('../data/user-data-provider');

function UserService() {
	var self = this;
	
	// public methods
	
	self.getUser = getUser;
	self.createUser = createUser;
	self.updateUser = updateUser;
	self.deleteUser = deleteUser;
	
	// private implementation
	
	function getUser(id) {
		return userDataProvider.getUser(id);
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

module.exports = new UserService();