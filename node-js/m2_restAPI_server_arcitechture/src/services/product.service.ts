import fs from "fs"
import path from "path";

const filePth = path.join(process.cwd(), "./src/database/db.json")

export const readProduct = () => {
    // console.log(process.cwd());
    // console.log(filePth);

    const product = fs.readFileSync(filePth, "utf-8");
    // console.log(JSON.parse(product));
    return JSON.parse(product)
}