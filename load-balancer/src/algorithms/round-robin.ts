import { NextFunction, Request, Response } from "express";
import { PORTS } from "../index.js";
import http from 'http';

let counter = 0;
export default function roundRobinAlgo(req: Request, res: Response, next: NextFunction) {
  const serverIndex = counter % PORTS.length;
  counter++;
  const port = PORTS[serverIndex];
  const proxy = http.request({
    host: 'localhost',
    port: port,
    path: req.url,
    method: req.method,
    headers: req.headers
  }, (response: any) => {
    console.log(`Proxying request to port ${port}`);
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error(`Error proxying request to port ${port}:`, err);
    res.status(500).send('Internal Server Error');
  });

  req.pipe(proxy, { end: true });
}
