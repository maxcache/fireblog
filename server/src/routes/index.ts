
import express = require('express');
var router = express.Router();
var app = express();
import path = require('path');

//Home page 
var renderHomePage = (req: express.Request, res: express.Response) => {
    console.log(req.path);
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
}


router.get('/', renderHomePage);

module.exports = router;
