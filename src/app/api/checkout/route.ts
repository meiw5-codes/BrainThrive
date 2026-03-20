import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://brainthrive.vercel.app"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://brainthrive.vercel.app"}/?cancelled=true`,
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7,
        metadata: { name: name || "", email },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
