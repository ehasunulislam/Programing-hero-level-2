import { Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../prisma/generated/prisma/enums";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();


// register user routes
router.post("/register", userController.registerUser);


// profile sector 
router.get("/me", authMiddleware.auth(Role.USER, Role.ADMIN, Role.AUTHOR), userController.getMyProfile);
router.put("/my-profile", authMiddleware.auth(Role.USER, Role.ADMIN, Role.AUTHOR), userController.updateMyProfile);


export const userRoutes = router;