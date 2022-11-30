var express = require('express');
var app = express.Router();

// --- Finance DashBoard ---
    var login_controller = require('../controllers/login_controller');
    var allMenu_controller = require('../controllers/allMenu_controller');
    var allLocation_controller = require('../controllers/allLocation_controller');
    var userBillingData = require('../controllers/userBillingData');
// --- Finance DashBoard ---

// --- live monitoring ---
    var GoogleSheet = require('../controllers/googleSheetAPI');
// --- live monitoring ---


// --- Finance DashBoard routes ---
    // user login
    app.post('/login', login_controller.login);
    module.exports = app;

    // list all menus for Finance Dashboard
    app.post('/allMenu', allMenu_controller.allMenu);
    module.exports = app;

    // list all location available for the particular user
    app.post('/allLocation', allLocation_controller.allLocation);
    module.exports = app;

    // send the Billing Details for the particular user with particular location
    app.post('/userBillingData', userBillingData.billingData);
    module.exports = app;
// --- Finance DashBoard routes ---

// --- Live Monitoring routes ---
    app.post('/googleSheet', GoogleSheet.googleSheet);
    module.exports = app;
// --- Live Monitoring routes ---




