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

app.get('/test', (req, res) => {
  res.send('Hello, World!, Test ' + req.body);
})

const port = process.argv[2] || 5000; 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
