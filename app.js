var async = require('async');
var request = require('request');
var _ = require('lodash');
var schedule = require('node-schedule');

var github = require('./lib/github');
var twitter = require('./lib/twitter');
var local = require('./local');

github.getRepos({ q: 'sadness' }, function (error, res, body) {
  if (error) {
    console.log(error);
  }
  var results = JSON.parse(body); 

  return github.getBranch(results.items, function(goods) {
    // console.log(goods);
    twitter.tweet(function(){
    	console.log('we done');
    })
  });
});



// schedule syntax for later

// var app = function() {
//   console.log('hello');
// }

// var j = schedule.scheduleJob({ rule: '*/1 * * * * *' }, function(){
//   app();
// });
