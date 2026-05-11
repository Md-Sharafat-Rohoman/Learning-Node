import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";


export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    // console.log("request", req);
    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    // console.log(urlParts)
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log("This is the actual id :", id)
    if (url === "/products" && method === "GET") {
        // const products = [
        //     {
        //         id: 1,
        //         name: "product - 1"
        //     }
        // ]
        const products = readProduct();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Products retrived successfully", data: products }));
    }
    else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        // console.log(product);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Products retrived successfully", data: product }));
    }
    else if (method === "POST" && url === "/products") {
        const body = await parseBody(req);
        console.log("body", body);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Products Created successfully",
                // data: product
            }));
    }
}