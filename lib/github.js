var request = require('request');

module.exports = {
	init: function() {
    return new GitHub({
      token: ghToken
    });
	}
}