'use strict';
const User = require('../models/user.model');
const fs = require('fs');
const csvJson = require("csvtojson");
const NodeCache = require( "node-cache" );
const applicationCache = new NodeCache();

exports.findAll = function(req, res) {
User.findAll(function(err, user) {
  if (err)
  res.send(err);
  
  res.send(user);
});
};

exports.create = function (req, res) {
    const newUser={
        'firstname': req.body.User.firstname,
        'lastname': req.body.User.lastname,
        'email': req.body.User.email,
        'username': req.body.User.username,
        'password': req.body.User.password
    }
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required details in the above form' });
    }else{
        User.create(newUser, function(err, user) {
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
  if (err) res.send(err);
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
                const userDetails = JSON.parse(JSON.stringify(users[0]));
                res.json({
                    status:true,
                    message:'Authenticated Successfully',
                    data: userDetails
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
    console.log('Registaration in progress for: '+req.body.username);
    const userDetails={
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password
    }

    User.create(userDetails, function (error, results) {
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


//helps for uploading household csv file to the database - working fine.
exports.uploadHouseDataSet = function(req, res) {
    var i = 0;
    var headers = null;
    var hjson = [];
    var file = req.file;
    var oname = file.originalname;

    fs.createReadStream(req.file.path)
    .pipe(csvJson())
    .on('data', (row) => {
        var jr = JSON.parse(row);
        if (i==0){
            headers = Object.keys(jr);
            console.log(headers.length+": "+headers[0]);
        }
        hjson.push(jr);
        i++;
    })
    .on('end', () => {
       User.uploadHouseholds(headers, hjson, function (error, results) {
            if (error) {
                console.log("Insertion of Household csv failed to database.");
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
exports.uploadTransDataSet = function(req, res) {
    var i = 0;
    var headers = null;
    var hjson = [];
    var file = req.file;
    var oname = file.originalname;

    fs.createReadStream(req.file.path)
    .pipe(csvJson())
    .on('data', (row) => {
        var jr = JSON.parse(row);
        if (i==0){
            headers = Object.keys(jr);
            console.log(headers.length+": "+headers[0]);
        }
        hjson.push(jr);
        i++;
    })
    .on('end', () => {
    
       User.uploadTransactions(headers, hjson, function (error, results) {
            if (error) {
                console.log("Insertion of transaction dataset to the datbase failed");
                res.json({
                    status: false,
                    message: 'Error: '+error
                });
            } else {
                console.log("Transactions data inserted to DB successfully.");
                res.json({
                    status: true,
                    message: oname+" uploaded successfully"
                });
            }
        });
    });
};

exports.uploadProductDataSet = function(req, res) {
    var i = 0;
    var headers = null;
    var hjson = [];
    var file = req.file;
    var oname = file.originalname;

    fs.createReadStream(req.file.path)
    .pipe(csvJson())
    .on('data', (row) => {
        var jr = JSON.parse(row);
        if (i==0){
            headers = Object.keys(jr);
            console.log(headers.length+": "+headers[0]);
        }
        hjson.push(jr);
        i++;
    })
    .on('end', () => {
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

exports.findByHnum = function(req, res) {
    User.findByHnum(req.param('hnum'), function(err, result) {
      if (err) res.send(err);
      const jsonResult = {};
      jsonResult["data"] = result;
      console.log("result: "+JSON.stringify(jsonResult));
      res.json(jsonResult);
    });
};

exports.getSample = function(req, res) {
    const value = applicationCache.get("sample");
    console.log("getSample function: "+value);
    if (value == undefined) {
        User.getSample(req.query.hnum, function(err, result) {
        if (err)
        res.send(err);
        const jsonResult = {};
        jsonResult["data"] = result;
        console.log("Result: "+JSON.stringify(jsonResult));
        applicationCache.set("sample", jsonResult, 3600000);
        res.json(jsonResult);
        });
    } else {
        console.log("sample data retrieved from cache");
        res.json(value);
    }
};

exports.getAllData = function(req, res) {
    User.getAllData(req, function(err, result) {
      if (err) res.send(err);
      const jsonResult = {};
      jsonResult["data"] = result;
      res.json(jsonResult);
    });
};

