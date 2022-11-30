const fs = require('fs').promises;
const path = require('path');
const process = require('process');
// access GoogleAPI
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
// access GoogleAPI
const logger = require('./logger');
// login page 
exports.googleSheet  = async function(req,res) {
    logger.info(`>>>>> /googleSheet <<<<<`);
    
    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = path.join(process.cwd(), './public/googleSheet/token.json');
    const CREDENTIALS_PATH = path.join(process.cwd(), './public/googleSheet/credentials.json');
    
    /**
    * Reads previously authorized credentials from the save file.
    *
    * @return {Promise<OAuth2Client|null>}
    */
    async function loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }
    
    /**
    * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
    *
    * @param {OAuth2Client} client
    * @return {Promise<void>}
    */
    async function saveCredentials(client) {
        const content = await fs.readFile(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);
    }
    
    /**
    * Load or request or authorization to call APIs.
    *
    */
    async function authorize() {
        let client = await loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await saveCredentials(client);
        }
        return client;
    }
    
    async function requestGoogleSheet(auth) {
        const sheets = google.sheets({version: 'v4', auth});
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: '1xHTFGqql5OTfCO-j4O4WbTOeHkkCgTz4XB7DBfAFViw',
            range: 'A2:D2',
        });
        const rows = res.data.values;
        console.log(rows);
        return rows;
    }
    let result = await authorize().then(requestGoogleSheet).catch(console.error);
    res.send(JSON.stringify(result));
}







