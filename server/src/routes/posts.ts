
import express = require('express');
import AWS = require('aws-sdk');
import * as MyEnc from '../utils';

var router = express.Router();
var app = express();

AWS.config.loadFromPath('./config/dynamodb.json');
var LastKnownKey = undefined;
var docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: "Posts",
    KeyConditionExpression: "Author = :a AND id >= :b",
    Limit: 2,
    ExclusiveStartKey: LastKnownKey,
    ExpressionAttributeValues: {
        ":a": "vikram",
        ":b": 1,
    }
};

var renderPosts = (req: express.Request, res: express.Response) => {
    params.ExpressionAttributeValues[":a"] = req.query["user"];
    if (req.query["page"] != undefined) {
        var decy = MyEnc.MyEncrypt.prototype.decrypt(req.query["page"])
        params.ExclusiveStartKey = JSON.parse(decy);// LastKnownKey
    } else {
        params.ExclusiveStartKey = LastKnownKey;
    }
    docClient.query(params, function (err, data) {
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
module.exports = router;