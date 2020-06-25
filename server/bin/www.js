#!/usr/bin/env node
import http from 'http';
import debug from 'debug';
import app from '../app';
import models from '../models';

debug('postit:server');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const myPort = parseInt(val, 10);

  if (Number.isNaN(myPort)) {
    // named pipe
    return val;
  }

  if (myPort >= 0) {
    // port number
    return myPort;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // requires elevated privileges;
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // port is already in use;
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(() => {
  /**
 * Listen on provided port, on all network interfaces.
 */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});
