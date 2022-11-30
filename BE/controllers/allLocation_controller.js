var con = require('../config/db.js');
const logger = require('./logger');
const util = require('util')
// allLocation
exports.allLocation = function(req,res){
    logger.info(`>>>>> /allLocation <<<<<`);
// -START receiving EmailID | Password | Privilege [POST]
    // user email
    const userEmail = req.body.userEmail;
    var objectValueEmail = JSON.parse(userEmail);
    var dataEmail=objectValueEmail['userEmail'];
    // -END user email
    // user selected menu
    const menuName = req.body.userMenu;
    var objectValueMenu = JSON.parse(menuName);
    var menu=objectValueMenu['userMenu'];
    // -END selected menu 
    // user privilege
    const privilegeName = req.body.userPrivilege;
    var objectValuePrivilege = JSON.parse(privilegeName);
    var userPrivilegeKey=objectValuePrivilege['userPrivilege'];
    // -END user 
// -END

// Checking the user Privilege in DB
    switch (userPrivilegeKey) {
        case 0:
        var userPrivilege= "superUser";
        break;
        case 1:
        var userPrivilege= "accountManagerMail";
        break;
        case 2:
        var userPrivilege= "branchHeadMail";
        break;
        default:
        var userPrivilege= "No Privilege";
        break;
    }
// -END
    con.connect(function(err) {
        if (err) {
            throw err;
        }
        else {
        // USER = SuperUser
            if (userPrivilege == "superUser") {
                logger.info(`*** SuperUser ***`);
                var User_query = 'SELECT DISTINCT Branch FROM ' + menu + '';
            }
        // USER - NormalUser
            else{
                logger.info(`*** NormalUser ***`);
                var User_query = 'SELECT DISTINCT Branch FROM ' + menu + '  WHERE '+userPrivilege+'="' + dataEmail + '"';
            }
            // select query for all location's according the user privilege
            con.query(User_query, function(err, result) {
                if (err) {
                    throw err;
                }
                else {
                    logger.info(`allLocation Query = ${User_query}`);
                    logger.info(`locations => ${util.inspect(result)}`);
                    res.send(JSON.stringify(result)); // sending all the menu's to angular
                }
            });
        }
    });
}
// allLocation