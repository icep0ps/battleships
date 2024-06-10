import express, { type Request, type Response } from 'express';
import path = require('path');

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.set('view engine', 'pug');

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});