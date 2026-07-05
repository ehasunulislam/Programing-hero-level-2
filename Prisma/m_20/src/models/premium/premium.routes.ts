import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { Role } from "../../../prisma/generated/prisma/enums";
import { premiumController } from "./premium.controller";
import { premiumGurdMiddleWare, } from "../../middlewares/premiumGuard.middleware";


const router = Router();

router.get("/", 
    authMiddleware.auth(Role.ADMIN, Role.USER, Role.AUTHOR),
    premiumGurdMiddleWare.subscriptionGuard(),
    premiumController.getSubscriptionStatus
)

export const PremiumRoutes = router;