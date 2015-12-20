var database = require('../database');

function deleteUser(id) {
	var preparedStatement = {
		name: 'users.deleteUser',
		text: 'DELETE ' + 
				'FROM users ' +
				'WHERE id=$1',
		values: [id]
	};
	
	return database.query(preparedStatement);
}

module.exports = deleteUser;