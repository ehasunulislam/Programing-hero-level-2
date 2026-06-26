import { Router } from "express";
import { authController } from "./auth.controller";

const router  = Router();

router.post("/login", authController.loginUser);

// m-21 agai giving a new accesstoken route
router.post("/refresh-token", authController.refreshToken)

export const authRoutes = router;