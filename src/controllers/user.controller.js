'use strict';
const User = require('../models/user.model');
const fs = require('fs');
const csvJson = require("csvtojson");
const NodeCache = require( "node-cache" );
const applicationCache = new NodeCache();



exports.findAll = function(req, res) {
User.findAll(function(err, user) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', user);
  res.send(user);
});
};

exports.create = function (req, res) {
    console.log(req.body.User)
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
    console.log('starting registration process for: '+req.body.username);
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

exports.findByHnum = function(req, res) {
    User.findByHnum(req.param('hnum'), function(err, result) {
      if (err) res.send(err);
      const jsonResult = {};
      jsonResult["data"] = result;
      console.log("json obj---"+JSON.stringify(jsonResult));
      res.json(jsonResult);
    });
};

exports.getSample = function(req, res) {
    const value = applicationCache.get("sample");
    console.log("in getSample --"+value);
    if (value == undefined) {
        console.log(req.query)
        User.getSample(req.query.hnum, function(err, result) {
        if (err)
        res.send(err);
        const jsonResult = {};
        jsonResult["data"] = result;
        console.log("json obj---"+JSON.stringify(jsonResult));
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
      console.log('controller')
      if (err) res.send(err);
      const jsonResult = {};
      jsonResult["data"] = result;
      res.json(jsonResult);
    });
};

exports.getAgeRange = function(req, res) {
    const ageRangeData = applicationCache.get("ageRangeData");
    console.log("in getAgeRangeData --"+ageRangeData);
    if ( ageRangeData == undefined ){
        User.getAgeRangeData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                const labels = [];
                const ymap = {};
                const resultMap = {};
                for (var i = 0; i < result.length; i++) {
                    const year = result[i].YEAR;
                    const spent = result[i].SPENT;
                    const ageRange = result[i].AGE_RANGE;
                    const resultData = [ageRange, spent];
                    labels.push(ageRange);
                    ymap[year] =  ymap[year] || [];
                    ymap[year].push(resultData);
                }
                resultMap["labels"]  = labels;
                resultMap["data"] = ymap;
                result = resultMap;
            }
            applicationCache.set("ageRangeData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("sample age range data retrieved from cache");
        res.json(ageRangeData);
    }
};

exports.getMaritalStatus = function(req, res) {
    const martialStatusData = applicationCache.get("maritalData");
    console.log("in getMaritalData --"+martialStatusData);
    if ( martialStatusData == undefined ){
        User.getMaritalData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                const labels = [];
                const ymap = {};
                const resultMap = {};
                for (var i = 0; i < result.length; i++) {
                    var martialStatus = result[i].MARITAL_STATUS;
                    const spent = result[i].SPENT;
                    const year = result[i].YEAR;
                    if (martialStatus == "null") {
                        martialStatus = "other";
                    }
                    const data = [year, spent];
                    labels.push(year);
                    ymap[martialStatus] =  ymap[martialStatus] || [];
                    ymap[martialStatus].push(data);
                }
                resultMap["labels"]  = labels;
                resultMap["data"] = ymap;
                result = resultMap;
            }
            console.log("maritalData json obj---"+JSON.stringify(result));
            applicationCache.set("maritalData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("sample marital data retrieved from cache");
        res.json(martialStatusData);
    }
};

exports.getWeeklyData = function(req, res) {
    const weeklyData = applicationCache.get("wkData");
    console.log("in getWeekData --"+weeklyData);
    if ( weeklyData == undefined ){
        User.getWeekData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                const labels = [];
                const ymap = {};
                const resultMap = {};
                for (var i = 0; i < result.length; i++) {
                    const year = result[i].YEAR;
                    const spent = result[i].SPENT;
                    var martialStatus = result[i].MARITAL_STATUS;
                    if (martialStatus == "null") {
                        martialStatus = "other";
                    }
                    const data = [martialStatus, spent];
                    labels.push(martialStatus);
                    ymap[year] =  ymap[year] || [];
                    ymap[year].push(data);
                }
                resultMap["labels"]  = labels;
                resultMap["data"] = ymap;
                result = resultMap;
            }
            console.log("weeklyData json obj---"+JSON.stringify(result));
            applicationCache.set("wkData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("sample marital data retrieved from cache");
        res.json(weeklyData);
    }
};

exports.getIncomeRange = function(req, res) {
    const incomeData = applicationCache.get("irData");
    console.log("in getIncomeRangeData --"+incomeData);
    if ( incomeData == undefined ){
        User.getIncomeRangeData(req, function(err, result) {
            if (err)
                res.send(err);
            if (null != result && result.length > 0) {
                const labels = [];
                const xmap = [];
                const resultMap = {};
                for (var i = 0; i < result.length; i++) {
                    const spent = result[i].SPENTP;
                    var incomeRange = result[i].INCOME_RANGE;
                    if (incomeRange == "null") {
                        incomeRange = "other";
                    }
                    labels.push(incomeRange);
                    xmap.push(spent);
                }
                resultMap["labels"]  = labels;
                resultMap["data"] = xmap;
                result = resultMap;
            }
            console.log("irData json obj---"+JSON.stringify(result));
            applicationCache.set("irData", result, 3600000);
            res.json(result);
        });
    } else {
        console.log("income range data retrieved from cache");
        res.json(incomeData);
    }
};
