import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();


router.post(
    "/checkout", 
    authMiddleware.auth(Role.ADMIN, Role.USER, Role.AUTHOR),
    subscriptionController.createCheckoutSession
);


// webhook realted work
router.post("/webhook", subscriptionController.handleWebHook)


// getSubscriptionStatus router
router.get("/status", 
    authMiddleware.auth(Role.ADMIN, Role.USER, Role.AUTHOR),
    subscriptionController.getSubscriptionStatus
)


export const subscriptionRouter = router;