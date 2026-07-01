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

export const subscriptionRouter = router;