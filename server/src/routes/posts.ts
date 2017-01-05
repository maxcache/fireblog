
import express = require('express');
import AWS = require('aws-sdk');
import * as MyEnc from '../utils';

var router = express.Router();
var app = express();

AWS.config.loadFromPath('./config/dynamodb.json');
var LastKnownKey = undefined;
var docClient = new AWS.DynamoDB.DocumentClient();
const postListParams = {
    TableName: "Posts",
    KeyConditionExpression: "Author = :a AND id >= :b",
    Limit: 2,
    ExclusiveStartKey: LastKnownKey,
    ExpressionAttributeValues: {
        ":a": "vikram",
        ":b": 1,
    }
};

const postParams = {
    TableName: "Posts",
    KeyConditionExpression: "Author = :a AND id = :b",
    ExpressionAttributeValues: {
        ":a": "vikram",
        ":b": 1,
    }
};



//TODO:  need to resolve this issue with MyEncrypt class not emmiting the functions
var renderPosts = (req: express.Request, res: express.Response) => {
    postListParams.ExpressionAttributeValues[":a"] = req.query["user"];
    if (req.query["page"] != undefined) {

        var decy = MyEnc.MyEncrypt.prototype.decrypt(req.query["page"])
        postListParams.ExclusiveStartKey = JSON.parse(decy);// LastKnownKey
    } else {
        postListParams.ExclusiveStartKey = LastKnownKey;
    }
    docClient.query(postListParams, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            var ency = {};
            if (data.LastEvaluatedKey != undefined) {

                ency = MyEnc.MyEncrypt.prototype.encrypt(JSON.stringify(data.LastEvaluatedKey))
            }
            res.json({ items: data.Items, lastKey: ency });
        }
    });
}

router.get('/posts', renderPosts)




var renderPostItem = (req: express.Request, res: express.Response) => {

    if (req.params["user"] != undefined && req.params["postid"] != undefined && isNumeric(req.params["postid"])) {
        postParams.ExpressionAttributeValues[":a"] = req.params["user"];
        postParams.ExpressionAttributeValues[":b"] = parseInt(req.params["postid"]);

        docClient.query(postParams, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                res.json({ item: data.Items[0] });
            }
        });
    }
    else {
        res.sendStatus(404);
    }
}

router.get('/post/:user/:postid/', renderPostItem)

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}




module.exports = router;