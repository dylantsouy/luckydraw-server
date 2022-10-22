const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const verifyToken = require('./middlewares/authJwt');

global.__basedir = __dirname;

// const corsOptions = {
//     origin: `http://localhost:${PORT}`,
// };

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
});

app.use('/api', routes);

app.use(logger('dev'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/api/`));
