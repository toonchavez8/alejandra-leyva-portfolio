"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageModal } from "@/components/atomics/imageModal";

export function HeroCarousel() {
	const plugin = React.useRef(
		Autoplay({ delay: 8000, stopOnInteraction: true })
	);

	const landingPageArray = [
		{
			src: "https://res.cloudinary.com/dg5bsefjv/image/upload/v1722958956/Ale-Leyva_Landing-Imgs_01_rzntnz.jpg",
			alt: "Ale Leyva",
		},
		{
			src: "https://res.cloudinary.com/dg5bsefjv/image/upload/v1722958956/Ale-Leyva_Landing-Imgs_02_wjtwuu.jpg",
			alt: "Ale Leyva",
		},
		{
			src: "https://res.cloudinary.com/dg5bsefjv/image/upload/v1722958958/Ale-Leyva_Landing-Imgs_03_m6ux83.jpg",
			alt: "Ale Leyva",
		},
		{
			src: "https://res.cloudinary.com/dg5bsefjv/image/upload/v1722958956/Ale-Leyva_Landing-Imgs_04_bnb2fn.jpg",
			alt: "Ale Leyva",
		},
		{
			src: "https://res.cloudinary.com/dg5bsefjv/image/upload/v1722958956/Ale-Leyva_Landing-Imgs_05_cancei.jpg",
			alt: "Ale Leyva",
		},
		{
			src: "https://res.cloudinary.com/dg5bsefjv/image/upload/v1722958956/Ale-Leyva_Landing-Imgs_06_f8evos.jpg",
			alt: "Ale Leyva",
		},
	];

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full max-w-7xl"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{landingPageArray.map((image, index) => (
					<CarouselItem key={index}>
						<Card>
							<CardContent className="flex aspect-video justify-center cursor-pointer">
								<ImageModal image={image} />
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
