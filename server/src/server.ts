
import express = require('express');
import path = require('path');
var posts = require('./routes/posts');
var index = require('./routes/index');
var authenticate = require('./routes/authenticate');

var port: number = process.env.PORT || 3000;
var app = express();
app.set('port', port);
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/api', [posts, authenticate])

app.use('/', index);

export { app }