import express from 'express';
import helmet from 'helmet';
import logger from './utilities/logger.util';
import cors from 'cors';
import api from './router';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to the react-node-monorepo'));

app.use(api);

app.use((_req, res) =>
  res.status(404).json({
    status: 'not-found',
    message: 'Seems like you are looking for something that does not exist',
  }),
);

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
