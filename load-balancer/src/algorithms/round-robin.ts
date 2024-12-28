import { NextFunction, Request, Response } from "express";
import { INSTANCES } from "../index.js";
import httpProxy from 'http-proxy';

let counter = 0;
const proxy = httpProxy.createProxyServer();

export default function roundRobinAlgo(req: Request, res: Response, next: NextFunction) {
  const serverIndex = counter % INSTANCES.length;
  counter++;
  const port: number = INSTANCES[serverIndex].port;

  proxy.web(req, res, { target: `http://localhost:${port}` }, (err) => {
    if (err) {
      console.log(`Error proxy: ${err}`); 
      res.status(500).send('Internal Server Error');
    }
  });
}
