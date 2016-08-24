var express = require('express');
var router = express.Router();
var config = require('../config');
var apiformat = require('../apiformat');
var request = require('request');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST login info. */
router.post('/', function (req, res, next) {
  var statusCode = 200;
  var success = true;
  var data = {
    "username" : null,
    "name":null,
    "email":null,
    "private_token":null,
    "avatar_url":null
  };
  var message = 'get user  info success';

console.log(req.body);
  var opts = config.buildOptions("session", "POST", true);
  opts.body = JSON.stringify(req.body);

  request(opts, function (error, response, body) {
    statusCode = response.statusCode;
    if (!error && statusCode==201) {
      var info = JSON.parse(body);
      //set return data
      data['username'] = info['username'];
      data['name'] = info['name'];
      data['email'] = info['email'];
      data['private_token'] = info['private_token'];
      data['avatar_url'] = info['avatar_url'];
    }
    else {
      success = false;
      statusCode = 410;
      var errInfo = JSON.parse(body);
      message = errInfo.message;
      console.log('something wrong! '+ message);
      if(body) data = body;
    }
    var formattedResponse = apiformat.formatResponse(statusCode,message,data,success);
    res.send(formattedResponse);
  })
})


module.exports = router;
