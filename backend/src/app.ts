import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import router from './app/routes';
import config from './app/config';

const app: Application = express();
const __dirname = path.resolve();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Real Time Chat App',
  });
});

app.use('/api/v1', router);

// production build
if (config.node_env === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

export default app;
