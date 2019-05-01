var AWS = require('aws-sdk');
var config = require("./config")
var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users

var myBucket = 'mydalabucket1';

var myKey = config.aws_access_key_id;

s3.createBucket({Bucket: myBucket}, function(err, data) {

    if (err) {

        console.log(err);

    } else {

        params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

        s3.putObject(params, function(err, data) {

            if (err) {

                console.log(err)

            } else {

                console.log("Successfully uploaded data to myBucket/myKey");

            }

        });

    }

});
