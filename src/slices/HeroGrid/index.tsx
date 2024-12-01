"use client";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Bounded from "../../components/atomic/Bounded";
import { HeroGridSlice } from "../../../prismicio-types";
/**
 * Props for `HeroGrid`.
 */
export type HeroGridProps = SliceComponentProps<Content.HeroGridSlice>;

/**
 * Component for "HeroGrid" Slices.
 */
const HeroGrid = ({ slice }: HeroGridProps): JSX.Element => {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Carousel
				plugins={[plugin.current]}
				className="w-full mx-auto "
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
			>
				<CarouselContent>
					{slice.primary.hero_image.map((item) => (
						<CarouselItem
							key={item.image_description}
							className="relative group"
						>
							<PrismicNextImage
								field={item.carusel_image}
								className="w-full aspect aspect-auto"
							/>
							<sub className="absolute top-0 left-8 px-2 py-1 text-lg  bg-black/10  filter mt-4  text-white opacity-0 group-hover:opacity-100  h-fit *:-mt-2 tracking-widest backdrop-blur-md">
								{item.image_description}
							</sub>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</Bounded>
	);
};

export default HeroGrid;
