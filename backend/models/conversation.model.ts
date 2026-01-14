import mongoose, { Schema } from 'mongoose';
import { ConversationProps } from '../types';

const conversationSchema = new mongoose.Schema<ConversationProps>({
  type: {
    type: String,
    enum: ['direct', 'group'],
    required: true,
  },
  name: String,
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  avatar: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

conversationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Conversation = mongoose.model<ConversationProps>(
  'Conversation',
  conversationSchema
);

export default Conversation;
