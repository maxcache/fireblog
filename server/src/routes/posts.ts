
import express = require('express');
var router = express.Router();
var app = express();
import AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');

var docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: "Post",
    KeyConditionExpression: "PostId = :a",
    ExpressionAttributeValues: {
        ":a": "1",
    }
};



var renderPosts = (req: express.Request, res: express.Response) => {
    console.log(req.path);
    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.json(data.Items);
        }
    });


}

router.get('/posts', renderPosts)


module.exports = router;