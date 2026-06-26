import { NextFunction, Request, Response } from "express";
import { Role } from "../../prisma/generated/prisma/enums";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../lib/prisma";

// global line for req.user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: Role;
            }
        }
    }
}

const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ? 
        req.cookies.accessToken 
        :
         req.headers.authorization?.startsWith("Bearer ") 
        ? 
        req.headers.authorization?.split(" ")[1] 
        : 
        req.headers.authorization;

        if(!token) {
            throw new Error("You are not looged in. Please log in to access this resource");
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

        if(!verifiedToken.success) {
            throw new Error(verifiedToken.error)
        }

        const { name, email, role, id} = verifiedToken.data as JwtPayload;

        if(requiredRoles.length && !requiredRoles.includes(role as Role)) {
            throw new Error("Forbidden. You are not authorized to access this resource");
        }

        const user = await prisma.user.findUnique({
            where: {
                id,
                name,
                email,
                role
            }
        });

        if(!user) {
            throw new Error("User not found");
        }

        if(user.activeStatus === "BLOCKED") {
            throw new Error("You are blocked. please contact support")
        }

        req.user = user;
        next();
    });
}


export const authMiddleware = {
    auth
}