var database = require('../database');

function updateUser(user) {
	var preparedStatement = {
		name: 'users.updateUser',
		text: 'UPDATE users ' +
				'SET ' +
				'email=$1, ' +
				'firstname=$2, ' +
				'lastname=$3 ' +
				'WHERE ' +
				'id=$4 ' ,
		values: [user.email,
				user.firstname,
				user.lastname,
				user.id]
	};
	
	return database.query(preparedStatement);
}

module.exports = updateUser;