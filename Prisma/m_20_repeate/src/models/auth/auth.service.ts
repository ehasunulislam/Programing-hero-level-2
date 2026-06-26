import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/pirsma";
import { jwtUtils } from "../../utils/jwt/jwt";
import { IloginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async(payload: IloginUser) => {
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }

    const userJwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToekn = jwtUtils.createToken(
        userJwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )

    const refreshToekn = jwtUtils.createToken(
        userJwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    return {
        accessToekn,
        refreshToekn
    }
}


export const authService = {
    loginUser
}