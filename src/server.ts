import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./route/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
})

server.listen(config.port, () => {
    console.log(`Server is running in the port ${config.port}`)
})