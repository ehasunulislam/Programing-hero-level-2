import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe";
import { SubscriptionStatus } from "../../../prisma/generated/prisma/enums";
import { hadnleCheckotComepleted, handleChangeSubscription } from "./subscription.utils";

const createCheckoutService = async(userId : string) => {
    const transactionResult = await prisma.$transaction(async(tx) => {

        const user = await tx.user.findUniqueOrThrow({
            where: {
                id: userId
            },
            include: {
                subscription: true
            }
        });

        let stripeCustomerId = user.subscription?.stripeCustomerId

        if(stripeCustomerId) {
            // new user
           const customer = await stripe.customers.create({
                name: user.name,
                email: user.email,
                metadata: {
                    userId: user.id
                }
            });

            stripeCustomerId = customer.id
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: config.stripe_product_price_id,
                    quantity: 1
                }
            ],
            // phone_number_collection: {
            //     enabled: false
            // },
            mode: "subscription",
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            success_url: `${config.app_url}/premium?success=true`,
            cancel_url: `${config.app_url}/payment?success=false`,
            metadata: { userId: user.id }
        });

        return session.url
    });

    return {
        paymentUrl: transactionResult
    }
}


// webhook relaeted service
const handleWebHookService = async(payload: Buffer, signature: string) => {
    const endpointSecret = config.stripe_webhook_secret 

    if (!endpointSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
    );

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
          await hadnleCheckotComepleted(event.data.object)
        break;
        case 'customer.subscription.updated':
            await handleChangeSubscription(event.data.object)
        break;

        case 'customer.subscription.deleted':
            await handleChangeSubscription(event.data.object)
            break
        default:
        // Unexpected event type
        console.log(`No event matched. Unhandled event type ${event.type}.`);
        break
    }
}


// getSubscriptionStatus service
const getSubscriptionStatus = async(userId: string) => {
    const isSubscriptionExits = await prisma.subscription.findUniqueOrThrow({
        where: {
            userId
        }
    });
    
    const isActive = isSubscriptionExits.status === "ACTIVE" &&
                    isSubscriptionExits.currentPeriodEnd && 
                    new Date(isSubscriptionExits.currentPeriodEnd) > new Date();

    return {
        status: isSubscriptionExits.status,
        isSubscribed: isActive,
        currentPeriodEnd: isSubscriptionExits.currentPeriodEnd
    }
}


export const subscriptionService = {
    createCheckoutService,
    handleWebHookService,
    getSubscriptionStatus
}