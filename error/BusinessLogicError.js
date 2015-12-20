function BusinessLogicError(msg) {
	 var e = Error.call(this, 'BusinessLogicError: ' + msg);
	 
	 this.message = e.message;
	 this.stack = e.stack;
}

BusinessLogicError.prototype = Object.create(Error.prototype);
BusinessLogicError.prototype.constructor = BusinessLogicError;

module.exports = BusinessLogicError;