var async = require('async');
var request = require('request');
var _ = require('lodash');
var schedule = require('node-schedule');

var github = require('./lib/github');
var local = require('./local.js');


async.waterfall([
  function(callback){
    request({
      method: 'GET',
      oauth_token: local.ghToken,
      headers: { 'User-Agent': 'ghpages-bot' },
      uri: 'https://api.github.com/search/repositories',
      qs: {
        q: 'node',
        language: 'JavaScript',
        sort: 'stars'
      }
    }, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      var results = JSON.parse(body); 
      console.log(results.items.length);
      callback(null, results.items);
    })
  },
  function(items, callback) {
    items = _.shuffle(items);
    console.log(items.length);
    items.forEach(function(repo) {
      console.log('inside each');
      request({
        method: 'GET',
        oauth_token: local.ghToken,
        headers: { 'User-Agent': 'ghpages-bot' },
        uri: repo.branches_url.split('{')[0]
      }, function(error, response, body) {
        console.log(response.headers);
        var branches = JSON.parse(body);
        if (branches.length) {
         branches.forEach(function(branch) {
            console.log(branch.name);
            if (branch.name === 'gh-pages') {
              console.log('hello');
              console.log(branches);
              return callback(null, response);    
            }
          })
        }
      })
    })
  }
], function (err, result) {
  console.log('done'); 

});



// schedule syntax for later

// var app = function() {
//   console.log('hello');
// }

// var j = schedule.scheduleJob({ rule: '*/1 * * * * *' }, function(){
//   app();
// });
