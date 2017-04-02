var _ = require('lodash');
var request = require('request');
var async = require('async');

var local = require('../local.js');

module.exports = {
	getRepos: function(qs, callback) {
		var defaults = {
	    q: 'node',
	    language: 'JavaScript',
	    sort: 'stars'
	  };

		qs = _.extend({}, defaults, qs);

		request({
		  method: 'GET',
		  auth: { bearer: local.ghToken },
		  headers: { 'User-Agent': 'ghpages-bot' },
		  uri: 'https://api.github.com/search/repositories',
		  qs: qs
		}, callback)
	},

	getBranch: function(repos, callback) {
		var goods = [];

		function httpGet(repo, callback) {
			var url = 'http://' + repo.owner.login + '.github.io/' + repo.name;
		  var options = {
			  method: 'GET',
			  auth: { bearer: local.ghToken },
			  headers: { 'User-Agent': 'ghpages-bot' },
			  uri: url
			};
		  request(options,
		    function(err, res, body) {
		    	if (res.statusCode === 200) {
		    		goods.push({repo: repo, ghpagesUrl: res.request.uri.href})
		    	}
		      callback(err, body);
		    }
		  );
		}

		async.map(_.shuffle(repos.slice(0,10)), httpGet, function (err, res){
		  if (err) return console.log(err);
		  // console.log(goods.length);
		  callback(goods);
		});
  }
}