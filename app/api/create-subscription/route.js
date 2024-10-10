import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
    try {
        // Initialize Razorpay instance
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        // Parse request body for subscription data (if any dynamic data is needed)
        const body = await req.json();

        // Create the subscription
        const result = await instance.subscriptions.create({
            plan_id: process.env.SUBSCRIPTION_PLAN_ID, // Use your plan id
            customer_notify: 1,
            quantity: 1,
            total_count: 1,
            addons: [], // You can add any addons if required
            notes: {
                key1: 'Note'
            }
        });

        // Return success response
        return NextResponse.json({ success: true, subscription: result });

    } catch (error) {
        console.error("Error creating subscription:", error);
        // Return error response
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
