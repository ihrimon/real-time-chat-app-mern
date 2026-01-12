import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import connectDB from './config/database';
import { authRoutes } from './routes/auth.route';
import { initialzeSocket } from './socket/socket';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const port = process.env.PORT;

const server = http.createServer(app);

// listen to socket events
initialzeSocket(server);

connectDB()
  .then(() => {
    console.log('Database connected');
    server.listen(port, () => {
      console.log('Server is running on port at', port);
    });
  })
  .catch((error: any) => {
    console.log(
      'Failed to start server due to database connection error: ',
      error
    );
  });
