var request = require('request');
var ghToken = 'bc5b18a4ccebe52ce4a1689b8770177050d03059';

module.exports = {
	init: function() {
    return new GitHub({
      token: ghToken
    });
	}
}