import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status";
import { premiumService } from "./premium.service";

const getSubscriptionStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await premiumService.getPremiumContents();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "getSubscriptionStatus show successfully",
      data: result,
    });
});

export const premiumController = {
    getSubscriptionStatus
}