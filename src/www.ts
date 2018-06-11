#!/usr/bin/env node

import appServer from "./server";
import * as debug from "debug";
import * as env from "dotenv";
import Database from './db';

import {createServer} from "http";

env.load();

let port = normalizePort(process.env.PORT || 3000);
let app = appServer.bootstrap().app;

let connection_attempts = 0;
let max_connection_attempts = 5;

app.set('port', port);

let server = createServer(app);

let db = new Database("mongodb://dbadmin:dbadmin1@ds111078.mlab.com:11078/charity-world-cup");

db.onError((error) => {
   console.log(error)
});

db.onDisconnected(() => {
    console.log("mongo disconnected");
    if(connection_attempts < max_connection_attempts) {
        connection_attempts++;
        db.connect();
    }
});

db.open(() => {
    console.log("mongo connected");
    server.listen(port)
});

db.connect();

server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', () => {
    let address : any = server.address();
    let bind = typeof port === 'string'
        ? `pipe ${address}`
        : `port ${address.port}`;

    debug(`Listening on ${bind}`)
});

function normalizePort(port: any): number | boolean {
    let val = parseInt(port, 10);

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port;
    }

    return false;
}



