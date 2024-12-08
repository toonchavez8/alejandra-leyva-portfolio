"use client";
import React from "react";
import Bounded from "@/components/atomic/Bounded";
import { Content, ImageField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { SliceComponentProps } from "@prismicio/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { LinkProps } from "next/link";

export type MediaGridProps = SliceComponentProps<
	Content.MediaGridSlice & {
		primary: {
			mediastories: Array<{
				page_link: { url?: string };
				media_icon_link?: { url?: string };
				article_name?: string;
				article_description?: string;
				date_of_publication?: string;
				editorial_name?: string;
				article_image?: ImageField;
				article_image_link?: { url?: string };
				article_image_alt_text?: string | "" | undefined;
			}>;
		};
	}
>;

const MediaGrid = ({ slice }: MediaGridProps): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="@container "
		>
			{slice.primary.pagetitle && (
				<h2 className="font-italiana self-start ps-8 text-2xl md:text-3xl  ">
					{slice.primary.pagetitle}
				</h2>
			)}
			<div className="flex w-full flex-wrap gap-2 justify-center @sm:justify-center @md:justify-around">
				{slice.primary.mediastories.map((item, index) => {
					// Safely access the `url` property
					const pageLinkUrl = item.page_link?.url || "#";
					const mediaIconUrl = item.media_icon_link?.url;

					return (
						<Link key={index} href={pageLinkUrl} target="_blank">
							<Card className="flex flex-col gap-2 p-2 items-center w-full max-w-[300px] mx-auto rounded hover:shadow-lg">
								<CardHeader className="">
									{/* Render the image with fallback logic */}
									{item.article_image_link?.url ? (
										<img
											src={item.article_image_link.url}
											alt={item.article_name || "Article Image"}
											className="w-full h-auto aspect-[3/2] object-cover"
										/>
									) : item.article_image ? (
										<PrismicNextImage
											field={item.article_image}
											className="w-full h-auto aspect-[3/2] object-cover"
										/>
									) : (
										<div className="w-full aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-800 text-gray-400">
											{/* Placeholder icon */}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-12 w-12"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 10l1.553-4.66A1 1 0 015.487 4h13.026a1 1 0 01.934.66L21 10m-18 0h18m-9 4a4 4 0 100-8 4 4 0 000 8zm6 2v4a1 1 0 01-1 1H7a1 1 0 01-1-1v-4m12 0h2a1 1 0 011 1v1m-16-1a1 1 0 011-1h2"
												/>
											</svg>
										</div>
									)}
								</CardHeader>

								<CardContent className="flex flex-col gap-2">
									{/* Render the article details */}
									<CardTitle>{item.article_name}</CardTitle>
									<CardDescription className="text-balance line-clamp-2">
										{item.article_description}
									</CardDescription>
									<CardDescription className="text-center font-semibold">
										Leer más
									</CardDescription>
								</CardContent>

								<CardFooter className="flex gap-2 w-full items-center">
									{mediaIconUrl && (
										<img
											src={mediaIconUrl}
											alt="Media Icon"
											className="w-6 h-6 rounded-full object-contain bg-white border border-slate-100"
										/>
									)}
									<p className="font-bold text-sm capitalize">
										{item.editorial_name}
									</p>
									<time
										dateTime={item.date_of_publication || ""}
										className="font-bold text-sm capitalize"
									>
										{item.date_of_publication
											? new Date(item.date_of_publication).toLocaleDateString(
													"es-MX",
													{
														year: "numeric",
														month: "short",
													}
												)
											: "Fecha desconocida"}
									</time>
								</CardFooter>
							</Card>
						</Link>
					);
				})}
			</div>
		</Bounded>
	);
};

export default MediaGrid;
