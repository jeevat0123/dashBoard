var con = require('../config/db.js');
const logger = require('./logger');


// menu
exports.billingData = function(req,res){
    logger.info(`>>>>> /userBillingData <<<<<`);
// -START receiving EmailID | Password | Privilege | Menu [POST]
    // user password
    const userPassword = req.body.userPassword;
    var objectValuePassword = JSON.parse(userPassword);
    var dataPassword=objectValuePassword['userPassword'];
    // user password END
    
    // user email
    const userEmail = req.body.userEmail;
    var objectValueEmail = JSON.parse(userEmail);
    var dataEmail=objectValueEmail['userEmail'];
    // user email END
    
    // user menu
    const menuName = req.body.userMenu;
    var objectValueMenu = JSON.parse(menuName);
    var menu=objectValueMenu['userMenu'];
    // var menu="minutes";
    // user  END
    
    // user Privilege
    const privilegeName = req.body.userPrivilege;
    var objectValuePrivilege = JSON.parse(privilegeName);
    var userPrivilegeKey=objectValuePrivilege['userPrivilege'];
    // user  END


    // user Location
    const LocationName = req.body.userLocation;
    var objectValueLocation = JSON.parse(LocationName);
    var userLocation=objectValueLocation['userLocation'];
    // user  END
    
    
    
    
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
    logger.info(`dataEmail:${dataEmail},menu:${menu},userPrivilegeKey:${userPrivilegeKey}, userPrivilege:${userPrivilege} `);
    
    if (userPrivilege == "superUser") {
            switch (menu) {
                case "Minutes":
			    var dataQuery ='SELECT * FROM Finance_Dashboard.`'+menu+'` WHERE  Branch='+'"'+userLocation+'"';
                    break;
                case "Revenue":
		 var dataQuery ='SELECT * FROM Finance_Dashboard.`'+menu+'` WHERE Branch='+'"'+userLocation+'"';
                    break;
                case "Revenue Projection":
		  var dataQuery ='SELECT * FROM Finance_Dashboard.`'+menu+'` WHERE Branch ='+'"'+userLocation+'"';

                    break;
                case "Minutes Projection":
	  var dataQuery ='SELECT * FROM Finance_Dashboard.`'+menu+'` WHERE Branch ='+'"'+userLocation+'"';
                    break;    
                default:
                    logger.error(`No Privilege found`);
                break;
            }
    }
    else{
        switch (menu) {
            case "Minutes":
                var dataQuery = 'SELECT * FROM Finance_Dashboard.`' + menu + '`  WHERE '+userPrivilege+'="' + dataEmail + '"'+ 'AND Branch='+'"'+userLocation+'"';
                break;
            case "Revenue":
                var dataQuery = 'SELECT * FROM Finance_Dashboard.`' + menu + '`  WHERE '+userPrivilege+'="' + dataEmail + '"'+ 'AND Branch='+'"'+userLocation+'"';
                break;
            case "Revenue Projection":
                var dataQuery = 'SELECT * FROM Finance_Dashboard.`' + menu + '`  WHERE '+userPrivilege+'="' + dataEmail + '"'+ 'AND Branch='+'"'+userLocation+'"';
                break;
            case "Minutes Projection":
                var dataQuery = 'SELECT * FROM Finance_Dashboard.`' + menu + '`  WHERE '+userPrivilege+'="' + dataEmail + '"'+ 'AND Branch='+'"'+userLocation+'"';
                break;      
            default:
                logger.error(`No Privilege found`);
            break;
        }
    }
    con.connect(function(err) {
        if (err) {
            throw err;
        }
        else {
            logger.info(`Menu Query:  ${dataQuery}`);
            con.query(dataQuery, function(err, result) {
                if (err) {
                    throw err;
                }
                else {
                    res.send(JSON.stringify(result)); // sending all the menu's to angular
                }
            });
        }
    });
    
}
// menu ends
