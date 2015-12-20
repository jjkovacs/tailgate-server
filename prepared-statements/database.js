var pg = require('pg'),
	q = require('q');

function Database() {
	var self = this,
		databaseUrl,
		client;
		
	// public methods
		
	self.query = query;
	
	(function init() {
		databaseUrl = process.env.DATABASE_URL ||
			'postgres://gzwvnbgjkjbvjw:UD2ocBNgP5ba9yTxahpg1mpgzi@ec2-54-227-249-165.compute-1.amazonaws.com:5432/d1gt2v659l6rtb' + '?ssl=true';
	
		console.log('Connecting to postgres...');
		
		pg.connect(databaseUrl, function(err, c) {
		  if (err) { 
			throw err;
		  }
		  
		  console.log('Connected to postgres!');
		  
		  client = c;
		});
	})();
	
	// private implementation
	
	function query(preparedStatement) {
		if(!preparedStatement) {
			throw new Error('Invalid argument: \'preparedStatement\' must be a valid prepared statement.');
		}
		
		return q.promise(function(resolve, reject){
			client.query(preparedStatement, function(error, result){
				if(error) {
					console.error('A database error occurred--' + error);
					reject(new Error('Database Error: ' + error));
					return;
				}
				
				resolve(result);
			});
		});
	}
}

module.exports = new Database();