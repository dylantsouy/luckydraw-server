const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const AdminControllers = require('../controllers/admin');
const PORT = 3000;
const app = express();

global.__basedir = __dirname;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'x-access-token, AcceptOrigin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.post('/signin', AdminControllers.signin);

app.use(logger('dev'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/api/`));
