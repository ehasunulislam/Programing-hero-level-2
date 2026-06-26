import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// registerUser
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registerd successfully",
      data: {
        user,
      },
    });
  },
);


// get Profile controller
const getProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

})

export const userController = {
  registerUser,
};
