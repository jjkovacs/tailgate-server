var userDataProvider = require('../data/user-data-provider'),
	BusinessLogicError = require('../error/BusinessLogicError');

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
		validateUser(user);
		
		return userDataProvider.createUser(user);
	}
	
	function updateUser(user) {
		validateUser(user);
		
		return userDataProvider.updateUser(user);
	}
	
	function deleteUser(id) {
		return userDataProvider.deleteUser(id);
	}
	
	// TODO: create a generic validation service for doing this
	function validateUser(user) {
		if(!user.firstname ||
			typeof user.firstname !== 'string' ||
			user.firstname.length > 32) {
			throw new BusinessLogicError('\'firstname\' is required, and must be a string between 1 and 32 characters');
		}
		
		if(!user.lastname ||
			typeof user.lastname !== 'string' ||
			user.lastname.length > 32) {
			throw new BusinessLogicError('\'lastname\' is required, and must be a string between 1 and 32 characters');
		}
		
		if(!user.email ||
			typeof user.email !== 'string' ||
			user.email.length > 128) {
			throw new BusinessLogicError('\'email\' is required, and must be a string between 1 and 128 characters');
		}
	}
}

module.exports = new UserService();