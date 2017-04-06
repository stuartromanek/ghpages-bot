var async = require('async');
var request = require('request');
var adjectives = require('adjectives');
var _ = require('lodash');
var schedule = require('node-schedule');


var github = require('./lib/github');
var twitter = require('./lib/twitter');
var local = require('./local');

var j = schedule.scheduleJob({ rule: '*/10 * * * * *' }, function(){
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
});
