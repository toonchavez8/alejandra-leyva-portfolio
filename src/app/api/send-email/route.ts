import nodemailer from "nodemailer";

export async function POST(req: Request) {
	const { name, email, message } = await req.json();

	// Configure Nodemailer transport
	const transporter = nodemailer.createTransport({
		service: "gmail", // You can replace with your email service provider (e.g., SendGrid)
		auth: {
			user: process.env.EMAIL_USER, // Your email address
			pass: process.env.EMAIL_PASS, // Your email password or app-specific password
		},
	});

	// Email options
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: process.env.EMAIL_TO, // The recipient email address
		subject: `New message from ${name}`,
		text: `Message from ${name} (${email}):\n\n${message}`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully:", info.response);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error: unknown) {
		// Type guard for error object
		if (error instanceof Error) {
			console.error("Error sending email:", error);
			return new Response(
				JSON.stringify({ success: false, error: error.message }),
				{ status: 500 }
			);
		} else {
			// Fallback if error is not an instance of Error
			console.error("Unknown error:", error);
			return new Response(
				JSON.stringify({ success: false, error: "An unknown error occurred." }),
				{ status: 500 }
			);
		}
	}
}

export async function OPTIONS() {
	// Handle pre-flight request
	return new Response(null, { status: 200 });
}
