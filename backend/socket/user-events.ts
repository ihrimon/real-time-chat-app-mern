import { Socket, Server as SocketIOServer } from 'socket.io';
import User from '../models/user.model';
import { generateToken } from '../utils/token';

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  socket.on('testSocket', (data) => {
    socket.emit('testSocket', { message: 'Realtime updates!' });
  });

  socket.on(
    'updateProfile',
    async (data: { name?: string; avatar?: string }) => {
      console.log('updateProfile event: ', data);

      const userId = socket.data.userId;

      if (!userId) {
        return socket.emit('updateProfile', {
          success: false,
          message: 'Unauthorized',
        });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            name: data.name,
            avatar: data.avatar,
          },
          { new: true }
        );

        if (!updatedUser) {
          return socket.emit('updateProfile', {
            success: false,
            message: 'user not found!',
          });
        }

        // generate token with update value
        const newToken = generateToken(updatedUser);

        socket.emit('updateProfile', {
          success: true,
          data: { token: newToken },
          message: 'Profile updated successfully',
        });
      } catch (error: any) {
        console.log('Error updating profile: ', error);

        socket.emit('updateProfile', {
          success: false,
          message: 'Error updating profile',
        });
      }
    }
  );

  socket.on('getContacts', async () => {
    try {
      const currentUserId = socket.data.userId;

      if (!currentUserId) {
        socket.emit('getContacts', {
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const users = await User.find(
        {
          _id: { $ne: currentUserId },
        },
        { password: 0 } // exclude password field
      ).lean(); // will fetch js objects

      const contacts = users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
      }));

      socket.emit('getContacts', {
        success: true,
        data: contacts,
      });
    } catch (error: any) {
      console.log('getContacts error: ', error);
      socket.emit('getContacts', {
        success: false,
        message: 'Failed to fetch contacts',
      });
    }
  });
}
