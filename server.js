const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// helps us to load register page.
app.get('/register', function (req, res) {  
    res.sendFile( __dirname + "/" + "index.html" );  
});

//helps us to load login page.
app.get('/login',(req,res)=>{
    res.sendFile(  __dirname + "/" + "login.html" );
});

// helps us to load welcome page.
app.get('/', function (req, res) {  
  res.sendFile( __dirname + "/" + "welcome.html" );  
});

//helps us to load home page.
app.get('/home',(req,res)=>{
  res.sendFile(  __dirname + "/" + "home.html" );
});


//helps us to load dashboard page.
app.get('/dashboard',(req,res)=>{
  res.sendFile(  __dirname + "/" + "dashboard.html" );
});

//helps us to load main page.
app.get('/main',(req,res)=>{
  res.sendFile(  __dirname + "/" + "main.html" );
});

//helps us to load sample data page.
app.get('/sampleHshd',(req,res)=>{
  res.sendFile(  __dirname + "/" + "sample-hshd.html" );
});

//helps us to load search hshd page.
app.get('/searchHshd',(req,res)=>{
  res.sendFile(  __dirname + "/" + "search-hshd.html" );
});


//helps us to load upload page.
app.get('/upload',(req,res)=>{
  res.sendFile(  __dirname + "/" + "upload.html" );
});


//load js files
app.get('/js/util.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/js/util.js'));
});

// Require employee routes
const userRoutes = require('./src/routes/user.routes');

//middleware.
app.use('/users', userRoutes);

