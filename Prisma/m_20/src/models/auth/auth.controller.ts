import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    // const loginResult = await authService.loginUser(payload);
    const { accessToken, refreshToken } = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24  // 1 day 
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: {
            accessToken,
            refreshToken
        }
    })
});

// m-21 agai giving a new accesstoken route
const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const {accessToken} = await authService.refreshToken(refreshToken);

    res.cookie("myToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24  // 1 day 
    });


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refresh successfully",
        data: {
            accessToken
        }
    })
})



export const authController = {
    loginUser,
    refreshToken
}