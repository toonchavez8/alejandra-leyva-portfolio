import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
	// Extract form data
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const message = formData.get("message") as string;

	// Configure Nodemailer transport
	const transporter = nodemailer.createTransport({
		service: "gmail", // Use your email service provider (e.g., Gmail, SendGrid, etc.)
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

		return { success: true };
	} catch (error) {
		return { success: false };
	}
}
