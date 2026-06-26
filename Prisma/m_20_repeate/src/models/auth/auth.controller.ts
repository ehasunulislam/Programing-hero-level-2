import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const {accessToekn, refreshToekn} = await authService.loginUser(payload);

    res.cookie("accesTOken", accessToekn, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });

    res.cookie("refreshTOken", refreshToekn, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in succesfully",
        data: {
            accessToekn,
            refreshToekn
        }
    });
});


export const authController = {
    loginUser
}