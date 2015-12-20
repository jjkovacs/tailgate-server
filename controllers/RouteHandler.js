var BusinessLogicError = require('../error/BusinessLogicError');

function RouteHandler(method, route, callback) {
	var self = this;
	
	// public methods
	
	self.getMethod = getMethod;
	self.getRoute = getRoute;
	self.getCallback = getCallback;
	
	(function init(){
		if(typeof route === 'function') {
			callback = route;
			route = '';
		}
		
		callback = wrapCallback(callback);
	})();
	
	// private implementation
	
	function getMethod() {
		return method;
	}
	
	function getRoute() {
		return route;
	}
	
	function getCallback() {
		return callback;
	}
	
	function wrapCallback(cb) {
		return function(req, res) {
			try {
				cb(req, res);
			} catch(error) {				
				if(error instanceof BusinessLogicError) {
					res.status(400).send({error: error.message});
				} else {
					console.error(error.message, error.stack);
					if(!res.headersSent) {
						res.status(500).send({error: 'Internal server error'});
					}
				}
			}
		};
	}
}

module.exports = RouteHandler;