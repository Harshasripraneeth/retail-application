'use strict';
const User = require('../models/user.model');
const csv = require('csv-parser');
const fs = require('fs');
const multer  = require('multer');
const csvj = require("csvtojson");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();



exports.findAll = function(req, res) {
User.findAll(function(err, user) {
  if (err) res.send(err);
  res.send(user);
});
};

exports.create = function (req, res) {
    console.log(req.body.User)
    var new_user={
        'firstname': req.body.User.firstname,
        'lastname': req.body.User.lastname,
        'email': req.body.User.email,
        'username': req.body.User.username,
        'password': req.body.User.password
    }
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required fields' });
    }else{
        User.create(new_user, function(err, user) {
            if (err)
                res.send(err);
            else{
                res.json({error:false,message:"User Registered Successfully!",data:user});
            }
        });
    }
};

exports.findById = function(req, res) {
User.findById(req.params.id, function(err, user) {
  if (err)
  res.send(err);
  res.json(user);
});
};

//used for login, verifying the credentials.
exports.authenticate = function (req, res) {
    User.findById(req.body, function (error, users) {
      if (error) {
          res.json({
            status:false,
            message:'Error: '+error
            });
      }
      else {
            if(users.length >0){
                var user_details = JSON.parse(JSON.stringify(users[0]));
                res.json({
                    status:true,
                    message:'Authenticated Successfully',
                    data: user_details
                });
            }
            else{
                res.json({
                    status:false,    
                    message:"Incorrect email or password"
                });
            }
      }
    });
}

//helps for registering the user credentials.
exports.register=function(req,res){
    console.log('starting registration process for: '+req.body.username);
    var user_details={
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password
    }

    User.create(user_details, function (error, results) {
            if (error) {
                res.json({
                    status: false,
                    message: 'Error: '+error
                });
            } else {
                res.json({
                    status: true,
                    data: results,
                    message: 'User Registered Sucessfully'
                });
            }
        });

    console.log('registration completed for: '+req.body.username);
}

exports.findByHnum = function(req, res) {
    User.findByHnum(req.param('hnum'), function(err, result) {
      if (err)
      res.send(err);
      var json_object = {};
      json_object["data"] = result;
      //json_object["data"].push(result);
      console.log("json obj---"+JSON.stringify(json_object));
      res.json(json_object);
    });
};

exports.getSample = function(req, res) {
   
        User.getSample(req.query.hnum, function(err, result) {
        if (err)
        res.send(err);
        var json_object = {};
        json_object["data"] = result;
        myCache.set("sample", json_object, 3600000);
        res.json(json_object);
        });
};

exports.getAllData = function(req, res) {
    User.getAllData(req, function(err, result) {
      console.log('controller')
      if (err)
      res.send(err);
      var json_object = {};
      json_object["data"] = result;
      //console.log("json obj all----"+JSON.stringify(json_object));
      res.json(json_object);
    });
};

exports.getAgeRangeData = function(req, res) {
    var ardata = myCache.get("ageRangeData");
    console.log("in getAgeRangeData --"+ardata);
    if ( ardata == undefined ){
        User.getAgeRangeData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                var labels = [];
                var ymap = {};
                var fmap = {};
                for (var i = 0; i < result.length; i++) {
                    var y = result[i].YEAR;
                    var s = result[i].SPENT;
                    var ar = result[i].AGE_RANGE;
                    var rc = [ar, s];
                    labels.push(ar);
                    ymap[y] =  ymap[y] || [];
                    ymap[y].push(rc);
                }
                fmap["labels"]  = labels;
                fmap["data"] = ymap;
                result = fmap;
            }
           // console.log("json obj---"+JSON.stringify(result));
            myCache.set("ageRangeData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("sample age range data retrieved from cache. No DB hit");
        res.json(ardata);
    }
};

exports.getMaritalData = function(req, res) {
    var mrdata = myCache.get("maritalData");
    console.log("in getMaritalData --"+mrdata);
    if ( mrdata == undefined ){
        User.getMaritalData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                var labels = [];
                var ymap = {};
                var fmap = {};
                for (var i = 0; i < result.length; i++) {
                    var y = result[i].MARITAL_STATUS;
                    var s = result[i].SPENT;
                    var ar = result[i].YEAR;
                    if (y == "null") {
                        y = "other";
                    }
                    var rc = [ar, s];
                    labels.push(ar);
                    ymap[y] =  ymap[y] || [];
                    ymap[y].push(rc);
                }
                fmap["labels"]  = labels;
                fmap["data"] = ymap;
                result = fmap;
            }
            console.log("maritalData json obj---"+JSON.stringify(result));
            myCache.set("maritalData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("sample marital data retrieved from cache. No DB hit");
        res.json(mrdata);
    }
};

exports.getWeekData = function(req, res) {
    var wkdata = myCache.get("wkData");
    console.log("in getWeekData --"+wkdata);
    if ( wkdata == undefined ){
        User.getWeekData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                var labels = [];
                var ymap = {};
                var fmap = {};
                for (var i = 0; i < result.length; i++) {
                    var y = result[i].YEAR;
                    var s = result[i].SPENT;
                    var ar = result[i].MARITAL_STATUS;
                    if (ar == "null") {
                        ar = "other";
                    }
                    var rc = [ar, s];
                    labels.push(ar);
                    ymap[y] =  ymap[y] || [];
                    ymap[y].push(rc);
                }
                fmap["labels"]  = labels;
                fmap["data"] = ymap;
                result = fmap;
            }
            console.log("wkdata json obj---"+JSON.stringify(result));
            myCache.set("wkData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("sample marital data retrieved from cache. No DB hit");
        res.json(wkdata);
    }
};

exports.getIncomeRangeData = function(req, res) {
    var irData = myCache.get("irData");
    console.log("in getIncomeRangeData --"+irData);
    if ( irData == undefined ){
        User.getIncomeRangeData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                var labels = [];
                var xmap = [];
                var fmap = {};
                for (var i = 0; i < result.length; i++) {
                    var s = result[i].SPENTP;
                    var ir = result[i].INCOME_RANGE;
                    if (ir == "null") {
                        ir = "other";
                    }
                    labels.push(ir);
                    xmap.push(s);
                }
                fmap["labels"]  = labels;
                fmap["data"] = xmap;
                result = fmap;
            }
            console.log("irData json obj---"+JSON.stringify(result));
            myCache.set("irData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("icome range data retrieved from cache. No DB hit");
        res.json(irData);
    }
};

//helps for uploading household csv file to the database - working fine.
exports.uploadHouseholds = function(req, res) {
    var i = 0;
    var headers = null;
    var hjson = [];
    var file = req.file;
    var oname = file.originalname;

    fs.createReadStream(req.file.path)
    .pipe(csvj())
    .on('data', (row) => {
        var jr = JSON.parse(row);
        if (i==0){
            headers = Object.keys(jr);
            //console.log(i+"----"+jr+"----"+keys);
            console.log(headers.length+"......"+headers[0]);
        }
        hjson.push(jr);
        i++;
    })
    .on('end', () => {
        console.log(hjson);
       User.uploadHouseholds(headers, hjson, function (error, results) {
            if (error) {
                console.log("Household data insertion failed");
                res.json({
                    status: false,
                    message: 'Error: '+error
                });
            } else {
                console.log("Household data inserted to DB successfully");
                res.json({
                    status: true,
                    message: oname+" uploaded successfully"
                });
            }
        });
        
    });
};

//helps for inserting transactions csv to the database - working fine.
exports.uploadTransactions = function(req, res) {
    var i = 0;
    var headers = null;
    var hjson = [];
    var file = req.file;
    var oname = file.originalname;

    fs.createReadStream(req.file.path)
    .pipe(csvj())
    .on('data', (row) => {
        var jr = JSON.parse(row);
        if (i==0){
            headers = Object.keys(jr);
            //console.log(i+"----"+jr+"----"+keys);
            console.log(headers.length+"......"+headers[0]);
        }
        hjson.push(jr);
        i++;
    })
    .on('end', () => {
        console.log(hjson);
       User.uploadTransactions(headers, hjson, function (error, results) {
            if (error) {
                console.log("Transactions data insertion failed");
                res.json({
                    status: false,
                    message: 'Error: '+error
                });
            } else {
                console.log("Transactions data inserted to DB successfully");
                res.json({
                    status: true,
                    message: oname+" uploaded successfully"
                });
            }
        });
    });
};

exports.uploadProducts = function(req, res) {
    var i = 0;
    var headers = null;
    var hjson = [];
    var file = req.file;
    var oname = file.originalname;

    fs.createReadStream(req.file.path)
    .pipe(csvj())
    .on('data', (row) => {
        var jr = JSON.parse(row);
        if (i==0){
            headers = Object.keys(jr);
            //console.log(i+"----"+jr+"----"+keys);
            console.log(headers.length+"......"+headers[0]);
        }
        hjson.push(jr);
        i++;
    })
    .on('end', () => {
        //console.log(hjson);
       User.uploadProducts(headers, hjson, function (error, results) {
            if (error) {
                res.json({
                    status: false,
                    message: 'Error: '+error
                });
            } else {
                res.json({
                    status: true,
                    message: oname+" uploaded successfully"
                });
            }
        });
    });
};