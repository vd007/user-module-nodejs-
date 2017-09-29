var express = require('express');
var router = express.Router();
var mongo_data  = require('../models/mongo_utils');

router.get('/registration', function(req, res, next) {
    var username = req['query']['username'];
    var password = req['query']['password'];
    var name = req['query']['name'];
    var email = req['query']['email'];
    var dob = req['query']['dob'];
    var status = req['query']['status'];
    var respond  = mongo_data.saveUser(username,password,name,email,dob,status);
    res.send('saved data for '+req['query']['username']+' resource ');
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
    var username = req['query']['username'];
    var password = req['query']['password'];
    var data = mongo_data.getUser(username,password);
    data.then(function(result) {
        console.log(result)
        res.send('respond with login '+result[0]['username']+' resource ');
    })
});


router.get('/update', function(req, res, next) {
    var username = req['query']['username'];
    var password = req['query']['password'];
    var name = req['query']['name'];
    var email = req['query']['email'];
    var dob = req['query']['dob'];
    var status = req['query']['status'];
    var respond  = mongo_data.updateUser(username,password,name,email,dob,status);
    res.send('respond with update resource');
});

module.exports = router;
