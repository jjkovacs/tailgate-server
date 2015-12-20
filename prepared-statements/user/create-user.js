var database = require('../database');

function createUser(user) {
	var preparedStatement = {
		name: 'users.createUser',
		text: 'INSERT INTO users ' +
				'(email, ' +
				'firstname, ' +
				'lastname) ' +
				'VALUES ' +
				'($1, ' +
				'$2, ' +
				'$3) ',
		values: [user.email,
				user.firstname,
				user.lastname]
	};
	
	return database.query(preparedStatement);
}

module.exports = createUser;