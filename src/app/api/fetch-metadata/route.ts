import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const url = searchParams.get("url");

	if (!url) {
		return new Response(JSON.stringify({ error: "URL is required" }), {
			status: 400,
		});
	}

	try {
		const { data } = await axios.get(url, { timeout: 5000 });
		const $ = cheerio.load(data);

		// Helper to clean site name
		const cleanSiteName = (hostname: string) => {
			// Remove 'www.' if present and return the main part of the domain
			return hostname.replace(/^www\./, "").split(".")[0];
		};

		const metadata = {
			title:
				$("meta[property='og:title']").attr("content") ||
				$("title").text() ||
				"Untitled",
			description:
				$("meta[property='og:description']").attr("content") ||
				$("meta[name='description']").attr("content") ||
				"No description available",
			image:
				$("meta[property='og:image']").attr("content") ||
				$("meta[name='twitter:image']").attr("content") ||
				$("link[rel='icon']").attr("href") || // Check for favicon
				$("link[rel='shortcut icon']").attr("href") || // Shortcut icon
				"/placeholder-image.png", // Default placeholder
			siteName: cleanSiteName(new URL(url).hostname),
		};

		return new Response(JSON.stringify(metadata), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
			status: 500,
		});
	}
}
