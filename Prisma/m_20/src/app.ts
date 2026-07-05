import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./models/users/user.route";
import { authRoutes } from "./models/auth/auth.routes";
import { postRouts } from "./models/post/post.router";
import { commentRouts } from "./models/comments/comment.router";
import { notfound } from "./middlewares/notFounds.middleaware";
import { globalErrorHandler } from "./middlewares/globalError.middleware";
import { subscriptionRouter } from "./models/subscription/subscription.routes";
import { stripe } from "./lib/stripe";
import { PremiumRoutes } from "./models/premium/premium.routes";

const app: Application  = express();


// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));


const endpointSecret = config.stripe_webhook_secret;
//  

app.use("/api/subscription/webhook", express.raw({ type: 'application/json' }))


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

app.use("/api/subscription", subscriptionRouter);

app.use("/api/premium", PremiumRoutes)


app.use(notfound);

// global error handling 
app.use(globalErrorHandler);

export default app;