import app from "./app";
import config from "./config";
import { prisma } from "./lib/pirsma";

const PORT = config.port;


async function main() {
    try{
        await prisma.$connect();
        console.log("connected to the datebase successfully")

        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`)
        })
    }
    catch(err) {
        console.log("server is running on error:", err);
        await prisma.$disconnect();
        process.exit(1);
    } 
}

main();