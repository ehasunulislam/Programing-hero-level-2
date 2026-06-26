import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// register user routes
router.post("/register", userController.registerUser);

export const userRouter = router;
