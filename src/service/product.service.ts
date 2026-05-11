import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct = (req: IncomingMessage, res: ServerResponse) => {
    // console.log(process.cwd());
    // console.log(filePath);
    const products = fs.readFileSync(filePath, "utf-8");
    // console.log(JSON.stringify(filePath));
    console.log(JSON.parse(products))
    return JSON.parse(products);
}