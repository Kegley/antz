import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { Monitor } from 'colyseus-monitor';

//add room handler
import { AntMap } from "./maps/AntMap"


const port = Number(process.env.PORT || 2657);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Attach monitor
const monitor = new Monitor({ server: gameServer, express: app });

gameServer.register("AntMap", AntMap, {});

app.use(express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

gameServer.listen(port);

console.log(`Listening on http://localhost:${ port }`);