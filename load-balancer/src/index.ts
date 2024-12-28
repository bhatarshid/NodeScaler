import express from 'express';
import dotenv from 'dotenv';
import roundRobinAlgo from './algorithms/round-robin.js';
import bodyParser from 'body-parser';
import { startNewInstance } from './server.js';
import './auto-scaling/auto-scaler.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

export const INSTANCES: { port: number; pid: number | undefined }[] = [];

// round robin algorithm
app.use('/', roundRobinAlgo);

app.listen(process.env.PORT, () => {
  startNewInstance();
  console.log('Listening on port:', process.env.PORT)
});