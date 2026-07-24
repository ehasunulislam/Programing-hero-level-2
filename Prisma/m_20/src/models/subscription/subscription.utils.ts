import Stripe from "stripe";
import { SubscriptionStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

// get getPeriodEnd 
export const getPeriodEnd = (payload: Stripe.Subscription) => {
    // const currentPeriodStart = stripeSubscriptoin.items.data[0]?.current_period_start;
    const currentPeriodEndInMillSecond = payload.items.data[0]?.current_period_end!;

    const currentPeriodEnd = new Date(currentPeriodEndInMillSecond * 1000);
    // console.log("end", currentPeriodEnd);

    return currentPeriodEnd
}

// handleComepleted function
export const hadnleCheckotComepleted = async(session: Stripe.Checkout.Session) => {
    // console.log(event.data.object)
    // console.log("checkout.session.completed");

    // const session: Stripe.Checkout.Session = event.data.object;
    console.log("✅ checkout.session.completed called");

    const userId = session.metadata?.userId;
    console.log("userId:", userId);

    const stripeCustomerId = session.customer as string;
    const stripeSubscriptoinId = session.subscription as string;

    if(!userId || !stripeCustomerId || !stripeSubscriptoinId) {
        console.log("Missing required information in the session object.");
        return;
    }

    const stripeSubscriptoin = await stripe.subscriptions.retrieve(stripeSubscriptoinId);

    const currentPeriodEnd  = getPeriodEnd(stripeSubscriptoin)


    await prisma.subscription.upsert({
        where: {
            userId
        },

        create: {
            userId,
            stripeCustomerId,
            stripeSubscriptoinId,
            status: "ACTIVE",
            currentPeriodEnd
        },

        update: {
            stripeCustomerId,
            stripeSubscriptoinId,
            status: "ACTIVE",
            currentPeriodEnd
        }
    }) 
}

// handleChangeSubscription funciton
export const handleChangeSubscription = async(payload: Stripe.Subscription) => {
    const stripeSubscriptionId = payload.id;

    const status = (payload.status === "active" || payload.status === "trialing") ? 
                    SubscriptionStatus.ACTIVE :
                    payload.status === "canceled" ? SubscriptionStatus.CANCELED :
                    SubscriptionStatus.EXPIRED;

    const currentPeriodEnd = getPeriodEnd(payload);

    const isSubscriptionExixt = await prisma.subscription.findUnique({
        where: {
            stripeSubscriptoinId: stripeSubscriptionId
        }
    });

    if(!isSubscriptionExixt) {
        console.log(`Subscription with ID ${stripeSubscriptionId} not found in the database.`);
        return;
    }

    await prisma.subscription.update({
        where: {
            stripeSubscriptoinId: stripeSubscriptionId
        },
        data: {
            status,
            currentPeriodEnd
        }
    })
}

