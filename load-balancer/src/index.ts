import express from 'express';
import createServer from '../../server/src/index.js'
import roundRobinAlgo from './algorithms/round-robin.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export const PORTS = [3001, 3002, 3003];

createServer(PORTS);

// round robin algorithm
app.use('/', roundRobinAlgo);

app.listen(3000, () => console.log('Listening on port 3000'));