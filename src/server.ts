import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./route/route";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
})

server.listen(5000, () => {
    console.log("Server is running in the port 5000")
})