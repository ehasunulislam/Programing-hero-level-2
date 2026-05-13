import type { IncomingMessage } from "http";

export const parseBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resole, reject) => {
        let body = "";
        
        req.on("data", (chunk) => {
            body += chunk
        });

        req.on("end", () => {
            try{
                resole(JSON.parse(body));
            }
            catch(err) {
                reject(err);
            }
        })
    })
}