import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      console.log(`New subscriber: ${session.customer_email}`);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as any;
      console.log(`Subscription cancelled: ${sub.id}`);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as any;
      console.log(`Payment failed: ${invoice.customer_email}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
