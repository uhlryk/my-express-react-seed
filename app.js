var config = require('./src/configs/server.local');
var Server = require('./dist/server');
var server = Server.config(config);
server.listen(function(){});
