var config = require('./src/configs/server.local');
var server = require('./dist/server');

server.run(config, function(){});
