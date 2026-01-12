import { Socket, Server as SocketIOServer } from 'socket.io';

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  socket.on('Test Socket', (data) => {
    socket.emit('Test Socket', { message: "It's working!" });
  });
}
