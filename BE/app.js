var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('./controllers/logger');

var cors = require("cors");

var indexRouter = require('./routes/routs');

var app = express();

app.use(express.static(__dirname + '/dist/app-new'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

// parse requests of content-type - application/json
app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT",
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({
//     extended: true
//     }));


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Capture 404 error
app.use((req,res) => {
  res.status(404).send("PAGE NOT FOUND");
  logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 500 error
app.use((err,req,res) => {
res.status(500).send('Could not perform the calculation!');
  logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
