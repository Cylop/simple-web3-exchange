import express from 'express';
import helmet from 'helmet';
import logger from './utilities/logger.util';
import cors from 'cors';
import api from './router';
import { authMiddleware, errorMiddleware } from './middlewares';
import { CustomError } from './middlewares/models/custom-error.model';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to the deversify API'));

app.use(authMiddleware);
app.use(api);

app.use((_req, res) => {
  throw new CustomError(
    'Not found',
    404,
    'Seems like you are looking for something that does not exist',
  );
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
