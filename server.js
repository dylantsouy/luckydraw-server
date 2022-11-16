const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const { Server } = require('ws');

global.__basedir = __dirname;

app.use(bodyParser.json());

app.use(cors());

app.use('/api', routes);

app.use(logger('dev'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/api/`));

const server = express().listen(3000, () => console.log(`Listening on 3000`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (data) => {
        data = data.toString();

        ws.send(data);

        let clients = wss.clients;
        clients.forEach((client) => {
            client.send(data);
        });
    });

    ws.on('close', () => {
        console.log('Close connected');
    });
});
