import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./models/users/user.route";
import { authRoutes } from "./models/auth/auth.routes";
import { postRouts } from "./models/post/post.router";
import { commentRouts } from "./models/comments/comment.router";

const app: Application  = express();


// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
    res.send("hello, world");
});

// real api
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/post", postRouts);

app.use("/api/comment", commentRouts);

export default app;