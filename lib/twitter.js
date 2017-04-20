var Twit = require('twit');
var T = new Twit({
  consumer_key:         process.env.twConsumerKey,
  consumer_secret:      process.env.twConsumerSecret,
  access_token:         process.env.twAccessToken,
  access_token_secret:  process.env.twAccessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
});

module.exports = {
	tweet: function(repo, callback) {
    var desc = "";
    if (repo.repo.description) {
      desc = repo.repo.description.substring(0, 130) + " ";
    }

    desc += repo.ghpagesUrl;
    
    var config = {
      status: desc
    }

    T.post('statuses/update', config, function(err, data, response) {
      if (err) {
        console.log(err);
      }
      return callback();
    });
	},

  updateProfileImg: function(img) {
    T.post('account/update_profile_image', { image: img })
  }

}