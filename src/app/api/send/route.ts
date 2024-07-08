import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any) {
  const body = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Trendy <onboarding@resend.dev>",
      to: "yousifm.helal@gmail.com",
      subject: "Orders From Trendy",
      html: "<p>Your order has been confirmed</p>",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
