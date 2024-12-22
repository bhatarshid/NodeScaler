import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', (req, res) => {
  res.send('Hello, World!, Test');
});

app.post('/test', (req, res) => {
  console.log(req.body); // Prints the request body
  res.send('Hello, World!, Test ' + req.body);
})

export default async function createServer (PORTS: number[]) {
  PORTS.forEach((port) => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  });
}