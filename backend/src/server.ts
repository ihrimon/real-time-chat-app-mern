import { Server } from 'http';
import config from './app/config';
import app from './app';

const main = async () => {
  const server: Server = app.listen(config.port, () => {
    console.log('Real Time Chat app is running on port at', config.port);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info('Server closed!');
      });
    }

    process.exit(1);
  };

  process.on('uncaughtException', (error) => {
    console.log(error);
    exitHandler();
  });

  process.on('unhandledRejection', (error) => {
    console.log(error);
    exitHandler();
  });
};

main();
