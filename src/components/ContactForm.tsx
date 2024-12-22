"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm({ copy }: Readonly<{ copy: string }>) {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.currentTarget);
		const formObject = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formObject), // Send the form data as JSON
			});

			const data = await response.json();

			setIsLoading(false);

			if (data.success) {
				toast({
					title: "Mensaje enviado correctamente!",
					description: "Me pondré en contacto con usted lo antes posible.",
				});
			} else {
				toast({
					title: "¡Lo sentimos!",
					description: "Hubo un error al enviar el mensaje.",
					variant: "destructive", // Display a destructive (error) toast
				});
			}
		} catch (error) {
			setIsLoading(false);
			toast({
				title: "¡Lo sentimos!",
				description: "Hubo un error al enviar el mensaje.",
				variant: "destructive", // Display a destructive (error) toast
			});
			console.error("Error sending email:", error);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-lg p-4 space-y-4">
			<p className="opacity-65">{copy}</p>
			<Input
				type="text"
				name="name"
				placeholder="Your Name"
				required
				className="bg-white"
			/>

			<Input
				type="email"
				name="email"
				placeholder="Your Email"
				required
				className="bg-white"
			/>

			<Textarea
				name="message"
				placeholder="Your Message"
				required
				className="bg-white"
			/>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? "Sending..." : "Send Message"}
			</Button>
		</form>
	);
}
