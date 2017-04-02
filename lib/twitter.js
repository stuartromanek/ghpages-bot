var Twit = require('twit');
var local = require('../local');

module.exports = {
	tweet: function(repo, callback) {
 
        var T = new Twit({
            consumer_key:         local.twConsumerKey,
            consumer_secret:      local.twConsumerSecret,
            access_token:         local.twAccessToken,
            access_token_secret:  local.twAccessTokenSecret,
            timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
        });

        var config = {
            status: repo.repo.description.substring(0, 130) + " " + repo.ghpagesUrl
        }

        T.post('statuses/update', config, function(err, data, response) {
            if (err) {
                console.log(err);
            }
            return callback();
        });
	}
}