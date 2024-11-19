
import nodemailer from "npm:nodemailer@6.9.16";

// Environment variables
const env = {
  MAIL_USERNAME: "mrdcompany941@gmail.com",
  MAIL_PASSWORD: "drgkfigqvxtfmtjy",
  MAIL_FROM_ADDRESS: "mrdcompany941@gmail.com",
  PORT: 3000,
};

// Create email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD,
  },
});

// Handle requests
const handler = async (req: Request): Promise<Response> => {
  if (req.method === "POST" && new URL(req.url).pathname === "/send-email") {
    const { to, url } = await req.json();

    // Validate required fields
    if (!to || !url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      // Email options
      const mailOptions = {
        from: env.MAIL_FROM_ADDRESS,
        to: to,
        subject: "Reset Password",
        html: `
          <h2>Reset Password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset Password</a>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return new Response(
        JSON.stringify({ message: "Email sent successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Email error:", error);
      return new Response(JSON.stringify({ error: error}), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Not Found", { status: 404 });
};

Deno.serve(handler);