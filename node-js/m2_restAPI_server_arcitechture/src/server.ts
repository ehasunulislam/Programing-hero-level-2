import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req: IncomingMessage, res) => {
    console.log(req)
})

server.listen(5000, () => {
    console.log("server is running on port 5000")
});

