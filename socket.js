let io = null;

exports.init = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
    },
  });

  return io;
};

exports.getIo = () => {
  if (!io) throw new Error('io is not initialized');
  return io;
};
