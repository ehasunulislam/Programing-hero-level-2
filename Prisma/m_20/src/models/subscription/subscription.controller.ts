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


// webhook handeler
const handleWebHook = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers['stripe-signature']!;

    await subscriptionService.handleWebHookService(event, signature as string)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Checkout session created successfully",
      data: null,
    });
})


// getSubscriptionStatus for user activeness in stripe
const getSubscriptionStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await subscriptionService.getSubscriptionStatus(userId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "getSubscriptionStatus show successfully",
      data: result,
    });
})

export const subscriptionController =  {
    createCheckoutSession,
    handleWebHook,
    getSubscriptionStatus
}