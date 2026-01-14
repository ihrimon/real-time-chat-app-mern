import { Socket, Server as SocketIOServer } from 'socket.io';
import Conversation from '../models/conversation.model';

const registerChatEvents = async (io: SocketIOServer, socket: Socket) => {
  socket.on('newConversation', async (data: any) => {
    console.log('newConversation event: ', data);
  });

  try {
    if (data.type === 'direct') {
      // checkt if already exists
      const existingConversation = await Conversation.findOne({
        type: 'direct',
        participants: { $all: data.participants, $size: 2 },
      })
        .populate({
          path: 'participants',
          select: 'name avatar email',
        })
        .lean();

      if (existingConversation) {
        socket.emit('newConversaton', {
          success: true,
          data: { ...existingConversation, isNew: false },
        });

        return;
      }
    }

    const conversation = await Conversation.create({
      type: data.type,
      participants: data.participants,
      name: data.name || '', // can be empty if direct conversation
      avatar: data.avatar || '',
      createdBy: socket.data.userId,
    });

    // get all connected sockets
    const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
      (s) => data.participants.includes(s.data.userId)
    );

    // join this conversation by all online participants
    connectedSockets.forEach((participantSocket) => {
      participantSocket.join(conversation._id.toString());
    });

    // send conversation data back (populated)
    const populatedConversation = await Conversation.findById(conversation._id)
      .populate({
        path: 'participants',
        select: 'name avatar email',
      })
      .lean();

    if (!populatedConversation) {
      throw new Error('Failed to populate conversations');
    }

    // emit conversation to all participants
    io.to(conversation._id.toString()).emit('newConversation', {
      success: true,
      data: { ...populatedConversation, isNew: true },
    });
  } catch (error: any) {
    console.log('newConversation error: ', error);
    socket.emit('newConversaton', {
      success: false,
      message: 'Failed to create conversation',
    });
  }
};

export default registerChatEvents;
