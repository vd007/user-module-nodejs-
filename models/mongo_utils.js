/**
 * Created by vd on 9/28/17.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Promise = require('bluebird');
Promise.promisifyAll(MongoClient);
var dbUtils ={};

var url = 'mongodb://localhost:27017/users';

dbUtils.getUser = function(username,password) {
    return MongoClient.connect(url)
        .then(function(db) {
            return db.collection('users').find({"username":"navneet"});
        })
        .then(function(cursor) {
            return cursor.toArray();
        })
        .then(function(content) {
            return content;
        })
        .catch(function(err) {
            throw err;
        });
};

dbUtils.saveUser = function (username,password,name,email,dob,status) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('users');
        var docs = [{"username":username,"password":password,"name":name,"email":email,"dob":dob,"status":status}];
        collection.insert(docs) ;
        db.close();
    });
    return true;
};

dbUtils.updateUser = function (username,password,name,email,dob,status) {
    var set = '{';
    if(password == undefined ||null){
        console.log('password empty');
    }else{
        set = set+'"password":"'+password+'"';
    }
    if(name == undefined ||null){
        console.log('name empty');
    }else{
        if(set != null ){
            set = set + ',"name":"'+name+'"';
        }
    }
    if(email == undefined ||null){
        console.log('email empty');
    }else{
        if(set != null ){
            set = set + ',"email":"'+email+'"';
        }
    }
    if(dob == undefined ||null){
        console.log('dob empty');
    }else{
        if(set != null ){
            set = set + ',"dob":"'+dob+'"';
        }
    }
    if(status == undefined ||null){
        console.log('status empty');
    }else {
        if(set != null ){
            set = set + ',"status":"'+status+'"';
        }
    }
    if(set != null ){
        set = set + '}';
    }
    var obj = JSON.parse(set);

    if(set.length<3){
        return;
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = {'username':username};
        console.log(query);
        var docs = { $set: obj };
        console.log(docs);
        db.collection("users").updateOne(query, docs, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
    return true;
};

dbUtils.log = function (msg) {
    console.log(msg);
};

module.exports = dbUtils;
