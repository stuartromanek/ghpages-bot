require('dotenv').config()
var async = require('async');
var request = require('request');
var adjectives = require('adjectives');
var _ = require('lodash');
var schedule = require('node-schedule');

console.log('STARTING UP');

if (!process.env.twConsumerKey) {
  console.log('dont have vars');
  process.exit(1);
}

var github = require('./lib/github');
var twitter = require('./lib/twitter');

var j = schedule.scheduleJob({hour: 7, minute: 30}, function(){

  function run (repo, callback) {
    console.log('running');
    var myAdj = _.shuffle(adjectives)[0];
    github.getRepos({ q: myAdj }, function (error, res, body) {
      if (error) {
        console.log(error);
      }
      var results = JSON.parse(body); 

      return github.findGhPages(results.items, function(goods) {
        if (goods.length) {
          var theRepo = _.shuffle(goods)[0];
          return github.getGhImg(theRepo, function(repo) {
            twitter.tweet(repo, function(){
              console.log('finished');
            })
          });
        } else {
          console.log('no result');
        }
      });
    });
  }

  var timesToRun = Math.floor(Math.random() * 10) + 1;

  for (var i = timesToRun - 1; i >= 0; i--) {
    run();
  }

});
