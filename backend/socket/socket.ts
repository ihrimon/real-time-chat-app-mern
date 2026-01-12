import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Socket, Server as SocketIOServer } from 'socket.io';
import envConfig from '../config/env.config';
import { registerUserEvents } from './user-events';

dotenv.config();

export function initialzeSocket(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // allow all rigins
    },
  }); // socket io server instance

  // auth middleware
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error: no token provided'));
    }

    jwt.verify(
      token,
      envConfig.jwt_access_secret as string,
      (error: any, decoded: any) => {
        if (error) {
          return next(new Error('Authentication error: invalid token'));
        }
        // attach user data to socket
        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
      }
    );
  });

  //   when socket connects, register events
  io.on('connection', async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log(`User connected: ${userId}, username: ${socket.data.name}`);

    // register events
    registerUserEvents(io, socket);

    socket.on('disconnect', () => {
      // user logs out
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
}
