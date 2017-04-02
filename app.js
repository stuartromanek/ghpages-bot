var async = require('async');
var request = require('request');
var adjectives = require('adjectives');
var _ = require('lodash');
var schedule = require('node-schedule');

var github = require('./lib/github');
var twitter = require('./lib/twitter');
var local = require('./local');


// schedule syntax

var j = schedule.scheduleJob({ rule: '*/10 * * * * *' }, function(){
  var myAdj = _.shuffle(adjectives)[0];
  github.getRepos({ topic: myAdj }, function (error, res, body) {
    if (error) {
      console.log(error);
    }
    var results = JSON.parse(body); 

    return github.getBranch(results.items, function(goods) {
      twitter.tweet(_.shuffle(goods)[0], function(){
        console.log("myAdj: "+ myAdj);
        console.log('we done');
      })
    });
  });
});
