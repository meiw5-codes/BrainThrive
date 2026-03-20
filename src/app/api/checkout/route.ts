// src/app/api/checkout/route.ts
// ─────────────────────────────────────────────────────────────────
// Creates a Stripe Checkout session and returns the URL.
// The client redirects the user to Stripe's hosted payment page.
// After payment, Stripe redirects back to /dashboard?success=true
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, email, name } = await req.json();

    if (!priceId || !email) {
      return NextResponse.json({ error: "Missing priceId or email" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: { name: name || "" },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://brainthrive.vercel.app"}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL || "https://brainthrive.vercel.app"}/?cancelled=true`,
      // Allow promotion codes (for referral discounts)
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial — no charge until day 8
        metadata: { name: name || "", email },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
