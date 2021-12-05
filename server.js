const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// load welcome page on root route
app.get('/', function (req, res) {  
    res.sendFile( __dirname + "/" + "welcome.html" );  
});

// load index.html to register
app.get('/register', function (req, res) {  
    res.sendFile( __dirname + "/" + "index.html" );  
});

//login handle
app.get('/login',(req,res)=>{
    //res.render('login');
    res.sendFile(  __dirname + "/" + "login.html" );
});

//view main page handle
app.get('/main',(req,res)=>{
  //res.render('login');
  res.sendFile(  __dirname + "/" + "main.html" );
});

//view sample data handle
app.get('/sampleHshd',(req,res)=>{
  //res.render('login');
  res.sendFile(  __dirname + "/" + "sample-hshd.html" );
});

//view all data by search handle
app.get('/searchHshd',(req,res)=>{
  //res.render('login');
  res.sendFile(  __dirname + "/" + "search-hshd.html" );
});

//view dashboard handle
app.get('/dashboard',(req,res)=>{
  //res.render('login');
  res.sendFile(  __dirname + "/" + "dashboard.html" );
});

//view upload data handle
app.get('/upload',(req,res)=>{
  //res.render('login');
  res.sendFile(  __dirname + "/" + "upload.html" );
});

//view home handle
app.get('/home',(req,res)=>{
  //res.render('login');
  res.sendFile(  __dirname + "/" + "home.html" );
});

//load js files
app.get('/js/util.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/util.js'));
});

//load js files
app.get('/js/arChart.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/arChart.js'));
});

//load js files
app.get('/js/hsize.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/hsize.js'));
});

//load js files
app.get('/js/msChart.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/msChart.js'));
});

//load js files
app.get('/js/weekChart.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/weekChart.js'));
});

//load js files
app.get('/js/irChart.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/irChart.js'));
});



// Require employee routes
const userRoutes = require('./src/routes/user.routes');
// using as middleware
app.use('/users', userRoutes);
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});