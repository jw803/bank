import { createTerminus } from '@godaddy/terminus'
import mongoose from 'mongoose'

export default function terminus(server) {
  createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
  })
}

function onSignal () {
  console.log('server is starting cleanup')
  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  }); 
}

async function onHealthCheck () {
  return mongoose.connection.readyState === 1 ? true : false
}
