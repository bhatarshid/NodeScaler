import { NextFunction, Request, Response } from "express";
import { PORTS } from "../index.js";
import httpProxy from 'http-proxy';

let counter = 0;
const proxy = httpProxy.createProxyServer();

export default function roundRobinAlgo(req: Request, res: Response, next: NextFunction) {
  const serverIndex = counter % PORTS.length;
  counter++;
  const port = PORTS[serverIndex];

  proxy.web(req, res, { target: `http://localhost:${port}` }, (err) => {
    if (err) {
      console.log(`Error proxy: ${err}`); 
      res.status(500).send('Internal Server Error');
    }
  });
}
