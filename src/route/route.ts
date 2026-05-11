import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.Controller";


export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.log(req.method);

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
        // console.log("THIS IS ROOT ROUTER")
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "this is root route" }));
    }
    else if (url?.startsWith("/products")) {
        productController(req, res);
    }
    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "this is root route" }));
    }
}