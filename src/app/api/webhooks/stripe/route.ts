// src/app/api/webhooks/stripe/route.ts
// ─────────────────────────────────────────────────────────────────
// Handles Stripe webhook events.
// When a payment succeeds → mark user as pro in your database.
// When a subscription is cancelled → downgrade to free.
//
// In beta (no database yet): events are logged and you can
// manually update user plans in Supabase or localStorage.
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ── Handle events ──────────────────────────────────────────────
  switch (event.type) {

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email   = session.customer_email || session.metadata?.email;
      const name    = session.metadata?.name;
      console.log(`✅ New subscriber: ${email} (${name})`);

      // TODO: update your Supabase profiles table:
      // await supabase
      //   .from("profiles")
      //   .update({ subscription_status: "active", stripe_customer_id: session.customer })
      //   .eq("email", email);
      break;
    }

    case "customer.subscription.updated": {
      const sub    = event.data.object as Stripe.Subscription;
      const status = sub.status; // "active" | "past_due" | "cancelled" | "trialing"
      console.log(`📋 Subscription updated: ${sub.id} → ${status}`);

      // TODO: sync to Supabase:
      // await supabase
      //   .from("profiles")
      //   .update({ subscription_status: status })
      //   .eq("stripe_customer_id", sub.customer);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`❌ Subscription cancelled: ${sub.id}`);

      // TODO: downgrade in Supabase:
      // await supabase
      //   .from("profiles")
      //   .update({ subscription_status: "cancelled" })
      //   .eq("stripe_customer_id", sub.customer);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`⚠️ Payment failed for: ${invoice.customer_email}`);

      // TODO: send "payment failed" email via Resend
      // and show a banner in the app
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
