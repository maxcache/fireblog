
import express = require('express');
var router = express.Router();
var app = express();
import path = require('path');
const dirFiles = path.resolve((path.dirname(__dirname), './dist/client/'));
//Home page 
var renderHomePage = (req: express.Request, res: express.Response) => {
    console.log(path.resolve(dirFiles + '/index.html'));
    res.sendFile(path.resolve(dirFiles + '/index.html'));
    //  res.sendStatus(200);
}

router.get('/*', renderHomePage);


module.exports = router;
