var app = require('../server').app;
var http = require('http');

var server = http.createServer(app);

server.listen(app.get('port'), function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('This app is listening on port:' + port);
});