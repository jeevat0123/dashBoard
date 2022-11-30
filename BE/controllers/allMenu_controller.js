var con = require('../config/db.js');
const logger = require('./logger');
const util = require('util')
// allMenu
exports.allMenu = function(req,res){
    con.connect(function(err) {
        if (err) {
            throw err;
        }
        else {
            logger.info(`>>>>> /allMenu <<<<<`);
            var User_query = 'SELECT id, report_name FROM menu;'; // select query to list ALL menu's
            logger.info(`allMenu Query = `+User_query);
            con.query(User_query, function(err, result) {
                if (err) {
                    throw err;
                }
                else {
                    logger.info(`allMenu => ${util.inspect(result)}`);
                    res.send(JSON.stringify(result)); // sending all the menu's to angular
                }
            });
        }
    });
}
// allMenu ends