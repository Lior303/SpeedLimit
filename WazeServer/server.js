import { getRabbitManager } from './Managers/RabbitManager.js';
import { getStorage, addToStorage } from './utils.js';
import http from 'http';

const rabbit = getRabbitManager();
rabbit.startListening('simulator', (data) => {
    addToStorage(data);
})

let host = 'localhost';
let port = 8001

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(getStorage());
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});