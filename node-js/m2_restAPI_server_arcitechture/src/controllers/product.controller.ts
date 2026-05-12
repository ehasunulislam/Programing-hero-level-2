import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";
import type { Iproduct } from "../types/product.types";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  console.log(urlParts);

  const id = urlParts && urlParts[1] === "product" ? Number(urlParts[2]) : null;
  console.log(`this is the real ${id}`);

  const productData = readProduct();

  if (url === "/product" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is product route", data: productData }),
    );
  } else if (method === "GET" && id !== null) { //get single product
    const productData = readProduct();
    const product = productData.find((p: Iproduct) => {
      return p.id === id;
    });

    console.log(product);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is single product route", data: product }),
    );
  }
};
