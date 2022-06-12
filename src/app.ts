import express from 'express';
import config from './config/index';
import loader from './loaders/index';
import 'reflect-metadata';

const app = express();

loader(app);

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`);
});
