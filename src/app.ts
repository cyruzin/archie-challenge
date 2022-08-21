import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '../../.env' });

import express from 'express';
import cors from 'cors';
import timeout from 'connect-timeout';

import errorHandler from './http/middleware/error-handler';
import routes from './routes';
import { postgres } from './config/database';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(timeout('5s'));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

(async () => {
  try {
    await postgres.connect();
    console.info('postgres connected');

    app.listen(port, () => {
      console.info(`app listening on port ${port}`);
    });
  } catch (err) {
    console.error('failed to start the app', err);
  }
})();
