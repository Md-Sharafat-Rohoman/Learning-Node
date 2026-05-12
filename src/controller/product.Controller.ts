import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";


export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/");
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    if (url === "/products" && method === "GET") {

        try {
            const products = readProduct();
            return sendResponse(res, 200, true, "Products retrived successfully", products)
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    }
    else if (method === "GET" && id !== null) {
        try {
            const products = readProduct();
            const product = products.find((p: IProduct) => p.id === id);
            // console.log(product);
            if (!product) {
                return sendResponse(res, 404, false, "Products Not Found", products)
            }
            // res.writeHead(200, { "content-type": "application/json" });
            // res.end(JSON.stringify({ message: "Products retrived successfully", data: product }));
            return sendResponse(res, 200, true, "Products retrived successfully", product)
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    }
    else if (method === "POST" && url === "/products") {
        try {
            const body = await parseBody(req);
            // console.log("body", body);
            const products = readProduct();
            const newProduct = {
                id: Date.now(),
                ...body
            }
            // console.log(newProduct);
            products.push(newProduct);
            // console.log(newProduct);
            insertProduct(products)
            return sendResponse(res, 200, true, "Products Created successfully", products)
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }

    }
    else if (method === "PUT" && id !== null) {
        try {
            const body = await parseBody(req);
            const products = readProduct();

            const index = products.findIndex((p: IProduct) => p.id === id);
            // console.log(index);
            if (index < 0) {
                return sendResponse(res, 404, false, "Products Not Found")
            }
            // console.log(products[index])
            products[index] = { id: products[index].id, ...body };
            insertProduct(products);
            return sendResponse(res, 200, true, "Products Created successfully", products[index])
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something went wrong", error)
        }
    }
    else if (method === "DELETE" && id !== null) {
        try {
            const products = readProduct();
            const index = products.findIndex((p: IProduct) => p.id === id);
            if (index < 0) {
                return sendResponse(res, 404, false, "Products Not Found")
            }
            products.splice(index, 1);
            insertProduct(products)
            return sendResponse(res, 200, true, "Products Deleted successfully", products)
        }
        catch (error) {
            return sendResponse(res, 500, false, "Internal Server Error during deletion", error);
        }
    }
}