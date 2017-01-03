
import express = require('express');
var router = express.Router();
var app = express();
import AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/cognito.json');

var postSignupForm = (req: express.Request, res: express.Response) => {
    var userPool = new AWS.CognitoIdentityServiceProvider();

    var params = {
        ClientId: "", /* required */
        Password: 'password@89', /* required */
        Username: 'username@mydomain.com', /* required */
        UserAttributes: [
            {
                Name: 'email',
                Value: 'email2@mydomain.com'
            }, {
                Name: 'name',
                Value: 'vicky'
            },
        ]
    };
    /*
        userPool.signUp(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
        */
}

router.post('/signup', postSignupForm)




var postSignInForm = (req: express.Request, res: express.Response) => {

}
router.post('/signin', postSignInForm)














module.exports = router;