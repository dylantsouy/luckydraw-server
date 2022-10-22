const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

const corsOptions = {
    origin: `http://localhost:${PORT}`,
};
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api', routes);

app.use(logger('dev'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/api/`));
