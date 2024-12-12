"use client";
import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";

import { SliceComponentProps } from "@prismicio/react";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Props for `HeroGrid`.
 */
export type HeroGridProps = SliceComponentProps<Content.HeroGridSlice>;

/**
 * Component for "HeroGrid" Slices.
 */
const HeroGrid = ({ slice }: HeroGridProps): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	const handleOpen = (index: number) => () => {
		setIndex(index);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateIndex = ({ index: newIndex }: { index: number }) => {
		setIndex(newIndex);
	};

	// Prepare slides data for the Lightbox component
	const slides = slice.primary.hero_image.map((item) => ({
		src: item.carusel_image.url ?? "", // Ensure src is always a string
		alt: item.image_description || "Hero Image",
		width: item.carusel_image.dimensions?.width,
		height: item.carusel_image.dimensions?.height,
	}));

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			{/* Lightbox for image viewing with carousel functionality */}
			<Lightbox
				open={open}
				close={handleClose}
				index={index}
				slides={slides}
				on={{
					view: updateIndex, // Update index when viewing an image
					click: handleOpen(index), // Open the Lightbox when an image is clicked
				}}
				plugins={[Inline]}
				carousel={{
					padding: 0,
					spacing: 0,
					imageFit: "cover",
				}}
				inline={{
					style: {
						width: "100%",
						maxWidth: "900px",
						aspectRatio: "3 / 2",
						margin: "0 auto",
					},
				}}
			/>
			<Lightbox
				open={open}
				close={handleClose}
				index={index}
				slides={slides}
				plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
				animation={{ fade: 0 }}
				controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
			/>
		</Bounded>
	);
};

export default HeroGrid;
