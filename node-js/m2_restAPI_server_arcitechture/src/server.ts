import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req: IncomingMessage, res) => {
    // console.log(req)
    
    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET") {
        // console.log("This is root route");
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({ message: "This is root route" }))
    } else if(url?.startsWith("/product")){
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({ message: "This is product route" }))
    }
    else {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({ message: "This is root route" }))
    }
})

server.listen(5000, () => {
    console.log("server is running on port 5000")
});

