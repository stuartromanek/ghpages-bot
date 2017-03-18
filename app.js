var async = require('async');
var github = require('./lib/github');
var request = require('request');
var _ = require('lodash');

var ghToken = 'bc5b18a4ccebe52ce4a1689b8770177050d03059';

async.waterfall([
  function(callback){
    console.log('joe testt');
    console.log('first');
    request({
      method: 'GET',
      oauth_token: ghToken,
      headers: { 'User-Agent': 'request' },
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
      callback(null, results.items);
    })
  },
  function(items, callback) {
    items = _.shuffle(items);
    items.forEach(function(repo) {
      request({
        method: 'GET',
        oauth_token: ghToken,
        headers: { 'User-Agent': 'request'},
        uri: repo.branches_url.split('{')[0]
      }, function(error, response, body) {
        var branches = JSON.parse(body);
        if (branches.length) {
         branches.forEach(function(branch) {
            if (branch.name === 'gh-pages') {
              callback(null, response);    
            }
          })
        }
      })
    })
    // console.log();
    // console.log('second');
    // callback(null)
  },
  function(response, callback) {
    console.log(response);
    callback(null)
  }
], function (err, result) {
  console.log('done'); 
});
