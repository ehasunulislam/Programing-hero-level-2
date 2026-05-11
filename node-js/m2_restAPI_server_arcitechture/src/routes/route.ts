import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controllers/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  // console.log(req)

  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("This is root route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));

  } else if (url?.startsWith("/product")) {
    productController(req, res)
  } else {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  }
};
