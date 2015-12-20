var database = require('../database');

function getUser(id) {
	var preparedStatement = {
		name: 'users.getUser',
		text: 'SELECT id, ' + 
				'email, ' +
				'firstname, ' +
				'lastname ' +
				'FROM users ' +
				'WHERE id=$1',
		values: [id]
	};
	
	return database.query(preparedStatement);
}

module.exports = getUser;