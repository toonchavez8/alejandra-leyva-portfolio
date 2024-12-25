// /app/api/send-email/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	const { name, email, message } = await req.json();
	// Configure Nodemailer transport
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const mailOptions = {
		from: email,
		to: process.env.EMAIL_TO,
		subject: `Nuevo mensaje de ${name}`,
		text: `Message from ${name} (${email}):\n\n${message}`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return new Response(
				JSON.stringify({ success: false, error: error.message }),
				{ status: 500 }
			);
		} else {
			return new Response(
				JSON.stringify({ success: false, error: "An unknown error occurred." }),
				{ status: 500 }
			);
		}
	}
}
