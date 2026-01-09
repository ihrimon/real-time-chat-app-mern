import type { Server } from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import config from './app/config/index.js';

let server: Server | null = null;

const bootstrap = async () => {
  try {
    const dburl = await mongoose.connect(config.database_uri as string);

    server = app.listen(config.port, () => {
      console.log(`🚀 Real Time Chat App running on port ${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server', error);
    process.exit(1);
  }
};

// Graceful shutdown
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('🛑 Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  exitHandler();
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  exitHandler();
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  exitHandler();
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  exitHandler();
});

bootstrap();
