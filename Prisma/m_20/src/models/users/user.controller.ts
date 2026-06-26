import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

// register user controller
// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     const user = await userService.registerUserIntoDB(payload);

//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User registered successfully",
//       data: {
//         user,
//       },
//     });

//   } catch (error) {

//   }
// };


const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  const user = await userService.registerUserIntoDB(payload);

  // res.status(httpStatus.CREATED).json({
  //   success: true,
  //   statusCode: httpStatus.CREATED,
  //   message: "User registered successfully",
  //   data: {
  //     user,
  //   },
  // });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      user
    }
  })
});




const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // const {accessToken} = req.cookies;
  // console.log(req.user, "Hello world");

  // const verifiedUser = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

  // if(typeof verifiedUser === "string") {
  //   throw new Error(verifiedUser);
  // }
  
  const profile = await userService.getMyProfileFromDB(req.user?.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile fetched successfully",
    data: {
      profile
    }
  })
});


const updateMyProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id as string;

  const payload = req.body;

  const updateUserProfile = await userService.updateMyProfielFromDB(userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user profile updated successfully",
    data: {
      updateUserProfile
    }
  })
})



export const userController = { registerUser, getMyProfile, updateMyProfile };
