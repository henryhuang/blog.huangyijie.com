var menus = require('./menu.json')
var yaml = require('js-yaml');
var fs = require('fs');
var process = require('process');

module.exports = function (cb) {

	var cwd = process.cwd();
	console.log(`Current directory: ${cwd}`);

    var configFilePath = cwd + '/themes/aloha/_config.yml';
    var c = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));

    var values = new Array();

	menus.forEach(function (item) {

		console.log('add menu: ' + JSON.stringify(item));

	    var ymlMenuItem = {
	        name: item['name'],
	        value: item['value'],
	        icon: item['icon']
	    };

	    if(item['target']) {
	    	ymlMenuItem['target'] = item['target']
	    };

	    c.menu[item['ConfigName']] = ymlMenuItem;
	    values.push(item['value']);

	});

    var y = yaml.safeDump(c);

    values.forEach(function(item) {
    	    y = y.replace('\'' + item + '\'', item);
    })

    fs.writeFileSync(configFilePath, y, 'utf8');

    if (cb) {
        cb();
    }

}