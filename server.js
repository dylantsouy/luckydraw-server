const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

global.__basedir = __dirname;

app.use(bodyParser.json());

app.use(cors({origin:true,credentials: true}));

app.use('/api', routes);

app.use(logger('dev'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/api/`));
