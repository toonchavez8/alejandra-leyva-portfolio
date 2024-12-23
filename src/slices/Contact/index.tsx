"use client";
import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { Separator } from "@/components/ui/separator";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Mail, Facebook, Instagram, Twitter, Globe } from "lucide-react"; // Add other icons as needed
import * as prismic from "@prismicio/client";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Maps social media domains to corresponding Lucide icons.
 */
const getSocialMediaIconFromLink = (url: string) => {
	try {
		const domain = new URL(url).hostname;
		if (domain.includes("twitter.com") || domain.includes("x.com"))
			return Twitter;
		if (domain.includes("facebook.com")) return Facebook;
		if (domain.includes("instagram.com")) return Instagram;
	} catch {
		// Return a default icon if parsing fails
		return Globe;
	}
	return Globe; // Default icon for unsupported platforms
};

/**
 * Encrypt email address with a simple obfuscation method.
 */
const obfuscateEmail = (email: string): string => {
	return btoa(email); // Base64 encode the email
};

/**
 * Decrypt the obfuscated email address.
 */
const deobfuscateEmail = (encodedEmail: string): string => {
	return atob(encodedEmail); // Base64 decode the email
};

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
	const encryptedEmail = obfuscateEmail(slice.primary.email || "");

	const handleEmailClick = () => {
		const email = deobfuscateEmail(encryptedEmail);

		// Open the user's default email client with the email address pre-filled
		window.location.href = `mailto:${email}`;
	};

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="flex gap-5 text-balance "
		>
			<h1 className="text-3xl w-full @md:text-3xl @lg:text-4xl font-italiana text-center ">
				{slice.primary.section_title}
			</h1>

			<p className="mb-4 text-center  @md:mb-8">{slice.primary.copy}</p>
			<div className="flex justify-around w-full flex-col @md:flex-row gap-5">
				<ContactForm copy={slice.primary.emailcopy || ""} />

				<Separator
					orientation="horizontal"
					className="@md:hidden bg-black/25"
				/>
				<Separator
					orientation="vertical"
					className="hidden @lg:block bg-black/25"
				/>
				<article className="flex flex-col items-start justify-start gap-5 p-5 @md:p-0">
					<div className="flex flex-col items-start justify-center gap-2">
						<h3 className="">{slice.primary.social_media_title}</h3>
						<p className="opacity-75">{slice.primary.social_media_copy}</p>
					</div>
					<div className="flex flex-wrap justify-start gap-2">
						{slice.primary.social_media.map((item) => {
							const url = prismic.asLink(item.social_media_link) || ""; // Extract the URL from the link field
							const Icon = getSocialMediaIconFromLink(url); // Determine the icon based on the URL
							return (
								<Button
									variant="outline"
									key={item.social_media_link.text}
									className="items-center justify-start hover:invert"
								>
									<Icon className="w-4 h-4 mr-2" />
									<PrismicNextLink
										field={item.social_media_link}
										target="_blank"
									>
										{item.user_name}
									</PrismicNextLink>
								</Button>
							);
						})}
						<Button
							onClick={handleEmailClick}
							variant="outline"
							className="items-center justify-start hover:invert"
						>
							<Mail className="w-4 h-4 mr-2" />
							Correo
						</Button>
					</div>
				</article>
			</div>
		</Bounded>
	);
};

export default Contact;
