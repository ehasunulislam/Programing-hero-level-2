import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const productData = readProduct();
    

    if(url === "/product" && method === "GET") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is product route", data: productData }));
    }
}