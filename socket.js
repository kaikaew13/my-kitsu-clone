let io = null;
const clientsId = {};

exports.init = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // console.log('sockets: ', socket.id);
    console.log('client conneted');

    // socket.on('target-user-id',)
    socket.on('setUserId', (id) => {
      clientsId[id] = socket;
      // console.log('clientsID: ', clientsId);
    });

    socket.on('disconnect', (s) => {
      console.log('a client disconnect!');
      // console.log('before deletion: ', Object.keys(clientsId).length);
      // console.log('disconnected socket id : ', socket.id);
      for (let i in clientsId) {
        if (clientsId[i].id === socket.id) {
          delete clientsId[i];
          break;
        }
      }
      console.log(`${Object.keys(clientsId).length} clients left`);
      // console.log('after deletion: ', Object.keys(clientsId).length);
    });
  });

  return io;
};

exports.getIo = () => {
  if (!io) throw new Error('io is not initialized');
  return io;
};

exports.getClientSockets = () => {
  return clientsId;
};
