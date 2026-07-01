import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { subscriptionService } from "./subscription.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from "http-status";

const createCheckoutSession = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await subscriptionService.createCheckoutService(userId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Checkout session created successfully",
      data: result,
    });
});

export const subscriptionController =  {
    createCheckoutSession
}