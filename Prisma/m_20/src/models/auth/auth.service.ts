import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IloginUser } from "./auth.interface";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: IloginUser) => {
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {email}
    });

    if(user.activeStatus === "BLOCKED") {
       throw new Error("You are blocked. please contact support")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    // accessToken
    // const  = jwt.sign( 
    //     jwtPayload, 
    //     config.jwt_access_secret, 
    //     {
    //         expiresIn: config.jwt_access_expires_in
    //     } as SignOptions
    // );
    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )

    // refreshToken
    // const refreshToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_refresh_secret, 
    //     {
    //         expiresIn: config.jwt_refresh_expires_in 
    //     } as SignOptions
    // );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    return {
        accessToken,
        refreshToken
    };
};



/* m-21 agai giving a new accesstoken route */
const refreshToken = async(refreshToken: string) => {
    const verifyRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);

    if(!verifyRefreshToken.success) {
        throw new Error(verifyRefreshToken.error)
    }

    const { id } = verifyRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    if(user.activeStatus === "BLOCKED") {
        throw new Error("User is already blocked")
    }

    const jwtRefreshTokenRestartPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessToken = jwtUtils.createToken(
        jwtRefreshTokenRestartPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    );

    return {
        accessToken
    }
}




export const authService = {
    loginUser,
    refreshToken
}