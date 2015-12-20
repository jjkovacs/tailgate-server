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
				console.error(error);
				if(!res.headersSent) {
					res.sendStatus(500);
				}
			}
		};
	}
}

module.exports = RouteHandler;