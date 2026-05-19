import fs from "fs";
import type { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date().toISOString()}`);

    const log = `\nMethod: ${req.method}, URL: ${req.url}, Time: ${new Date().toISOString()}\n`;

    fs.appendFile("log.txt", log, (err) => {
        console.error("Error writing to log file:", err);
    })

    next();
}


export default logger;