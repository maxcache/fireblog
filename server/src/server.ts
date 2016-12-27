 
import express = require('express');
import path = require('path');

var port: number = process.env.PORT || 3000;
var app = express();
app.set('port', port);

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
}

app.get('/*', renderIndex);

 

export { app }