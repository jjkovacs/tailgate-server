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
}

module.exports = RouteHandler;