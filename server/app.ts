import express, { type Request, type Response } from 'express';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
