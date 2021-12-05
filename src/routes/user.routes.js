const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()
const userController =   require('../controllers/user.controller');

// Retrieve all users
//router.get('/', userController.findAll);

// Create a new user router.post('/', userController.create);

//Register handle
router.post('/register', userController.register);

router.post('/login', userController.authenticate);

// Retrieve a single household data
router.get('/hnum', userController.findByHnum);

// Retrieve a single sample household data
router.get('/sampledata', userController.getSample);

// Retrieve all households data
router.get('/getAllData', userController.getAllData);

// Upload all data
router.post('/upload-hshd', upload.single('household'), userController.uploadHouseholds);

// Upload all data
router.post('/upload-trnsctns', upload.single('transaction'), userController.uploadTransactions);

// Upload all data
router.post('/upload-products', upload.single('product'), userController.uploadProducts);

// get data to plot charts
router.get('/getAgeRangeData',userController.getAgeRange);

// get data to plot charts
router.get('/getMaritalData',userController.getMaritalStatus);

// get data to plot charts
router.get('/getWeekData',userController.getWeeklyData);

// get data to plot charts
router.get('/getIncomeRangeData',userController.getIncomeRange);

module.exports = router