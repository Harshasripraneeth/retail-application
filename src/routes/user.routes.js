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
router.get('/shnum', userController.getSample);

// Retrieve all households data
router.get('/getAllData', userController.getAllData);

// Upload all data
router.post('/upload-hshd', upload.single('household'), userController.uploadHouseholds);

// Upload all data
router.post('/upload-trnsctns', upload.single('transaction'), userController.uploadTransactions);

// Upload all data
router.post('/upload-products', upload.single('product'), userController.uploadProducts);

// get data to plot charts
router.get('/getAgeRangeData',userController.getAgeRangeData);

// get data to plot charts
router.get('/getMaritalData',userController.getMaritalData);

// get data to plot charts
router.get('/getWeekData',userController.getWeekData);

// get data to plot charts
router.get('/getIncomeRangeData',userController.getIncomeRangeData);

module.exports = router