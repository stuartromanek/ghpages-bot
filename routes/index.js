var _ = require('lodash');
var assets = require('./assets');

module.exports = function(app) {

  // app.get('/', function(req, res) {
  // 	var data = { items: [ {name: 'jimmy'}, {name: 'Suzy'} ] };
  //   return render(res, 'index.html', data);
  // });

 app.get('/', function(req, res) {
    var data = { items : [
      { name: 'item 1' },
      { name: 'item 2' }
    ]}
    return render(res, 'index.html', data);
  });

 app.post('/api/markdown', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
 });

};

function render(res, template, data) {
  return res.render(template, _.merge((data || {}), { assets: assets.getAssets() }));
}