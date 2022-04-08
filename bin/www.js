#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "../app.js";
import http from "http";
import logger from "../lib/logger.js";
import terminus from "../lib/terminus.js";

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || 3000);

/**
 * Create HTTP server.
 */

const server = http.createServer(app.callback());

// start shutdown gracefully function
terminus(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portNum = parseInt(val, 10)

  if (isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.info("Listening on " + bind);
  console.log('server is listening on', addr.port);
}
