var express = require('express');
var router = require('./router/router.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var app = express();
app.use('/',express.static(__dirname + '/view'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/render', express.static(__dirname + '/render'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));


app.use(bodyParser.json({ limit: '50mb' })); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser());

app.use(cookieParser());
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));


router(app);

app.listen(80, () => {
    console.log('服务器已开启！');
});