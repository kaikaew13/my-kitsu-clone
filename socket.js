let io = null;
let socket = null;
const allClients = [];
const clientsId = {};

exports.init = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('sockets: ', socket.id);
    console.log('client conneted');

    // socket.on('target-user-id',)
    socket.on('setUserId', (id) => {
      clientsId[id] = socket;
      console.log('clientsID: ', clientsId);
    });

    // socket.on('disconnect', () => {
    //   console.log('Got disconnect!');
    //   var i = allClients.indexOf(socket);
    //   allClients.splice(i, 1);
    // });
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
