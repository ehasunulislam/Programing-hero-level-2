import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import { userRouter } from "./models/users/user.route";
import { authRoutes } from "./models/auth/auth.routes";

const app: Application = express();

// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// root
app.get("/", async (req: Request, res: Response) => {
  res.send("hello, world");
});

app.use("/api/users", userRouter);

app.use("/api/auth", authRoutes);

export default app;
