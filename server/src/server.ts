
import express = require('express');
import path = require('path');
var posts = require('./routes/posts');

//var index = require('./routes/index');
//var authenticate = require('./routes/authenticate');

var port: number = process.env.PORT || 3000;
var app = express();
app.set('port', port);

app.use('/api', [posts])

//When trying to directly navigate to the post through address bar, send the base index.html contents.
//need to find a better way to handle this
app.use('/post/*/(\\d+)',express.static(path.join(__dirname, '../client')));


app.use('/',express.static(path.join(__dirname, '../client')));


export { app }