const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const SocketServer = require('ws').Server;

global.__basedir = __dirname;

app.use(bodyParser.json());

app.use(cors());

app.use('/api', routes);

app.use(logger('dev'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/api/`));

const server = express().listen(3333, () => {
    console.log(`Listening on 3333`);
});

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (data) => {
        // 收回來是 Buffer 格式、需轉成字串
        data = data.toString();

        /// 發送消息給client
        ws.send(data);

        /// 發送給所有client：
        let clients = wss.clients; //取得所有連接中的 client
        clients.forEach((client) => {
            client.send(data); // 發送至每個 client
        });
    });

    ws.on('close', () => {
        console.log('Close connected');
    });
});
