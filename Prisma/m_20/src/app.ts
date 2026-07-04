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

const app: Application  = express();


// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));


const endpointSecret = config.stripe_webhook_secret;
// stripe webhook realted middleware
// app.post("/api/subscription/webhook", express.raw({ type: 'application/json' }), (request, response) => {
//     let event = request.body;
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//         // Get the signature sent by Stripe
//         const signature = request.headers['stripe-signature']!;
//         try {
//         event = stripe.webhooks.constructEvent(
//             request.body,
//             signature,
//             endpointSecret
//         );
//         } catch (err : any) {
//             console.log(`⚠️  Webhook signature verification failed.`, err.message);
//             return response.status(400).json({
//                 message: err.message
//             });
//         }
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//         case 'payment_method.attached':
//         const paymentMethod = event.data.object;
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//         default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });


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

app.use("/api/subscription", subscriptionRouter)


app.use(notfound);

// global error handling 
app.use(globalErrorHandler);

export default app;