function Controller(baseUrl, handlers) {
	var self = this;
	
	// public methods
	
	self.getBaseUrl = getBaseUrl;
	self.getHandlers = getHandlers;
	
	// private implementation
	
	function getBaseUrl() {
		return baseUrl;
	}
	
	function getHandlers() {
		return handlers;
	}
}

module.exports = Controller;