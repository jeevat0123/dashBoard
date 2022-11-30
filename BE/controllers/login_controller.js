var con = require('../config/db.js');
const logger = require('./logger');
// login page 
exports.login  = function(req, res) {
    // -START receiving EmailID and Password [POST]
    const userEmailId = req.body.user;
    const userPassword = req.body.password;
    // -END
    var privilege;
    const success =0;
    const failed =1;
    con.connect(function(err) {
        if (err) {
            throw err;
        }
        else {
            logger.info(`>>>>> /login <<<<<`);
            var User_query = 'SELECT privilege FROM login  WHERE emailId="' + userEmailId + '" and password="' + userPassword + '"';
            logger.info(`Login Query = `+User_query);
            con.query(User_query, function(err, result) {
                if (err) {
                    throw err;
                }
                else {
                    if (result != 0) {
                        privilege = Number(result[0].privilege);
                        var data = {
                            result: success,
                            email: userEmailId,
                            password: userPassword,
                            privilege: privilege,
                        };
                        logger.info(`Login-Success => userEmailId:${userEmailId}, userPassword:${userPassword}, Privilege:${privilege}, result:${success} `);
                        res.send(JSON.stringify(data));
                    }
                    else{
                        var data = {
                            result: failed,
                            email: "",
                            password: ""
                        };
                        logger.info(`Login-Failed  => userEmailId:${userEmailId}, userPassword:${userPassword}, Privilege:${privilege}, result:${failed} `);
                        res.send(JSON.stringify(data));
                    }
                }
            });
        }
    });        
};
// login page end
