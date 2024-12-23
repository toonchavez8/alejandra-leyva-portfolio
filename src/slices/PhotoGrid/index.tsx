"use client";
import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Props for `PhotoGrid`.
 */
export type PhotoGridProps = SliceComponentProps<Content.PhotoGridSlice>;

/**
 * Component for "PhotoGrid" Slices.
 */

const PhotoGrid = ({ slice }: PhotoGridProps): JSX.Element => {
	const [index, setIndex] = useState(-1);

	const photos = slice.primary.grid_of_images
		.map((image) => {
			if (!image?.image?.url || !image.image.dimensions) return null; // Ensure all required fields are present
			return {
				src: image.image.url,
				width: image.image.dimensions.width,
				height: image.image.dimensions.height,
				alt: image.image.alt ?? "",
			};
		})
		.filter((photo) => photo !== null) as {
		src: string;
		width: number;
		height: number;
		alt: string;
	}[]; // Add filter and type assertion

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			{slice.variation === "gridWithTittle" && (
				<h2 className="items-start mb-10 mr-auto text-4xl leading-tight tracking-tighter text-left font-italiana">
					{slice.primary.title}
				</h2>
			)}
			<ColumnsPhotoAlbum
				photos={photos}
				columns={(containerWidth) => {
					if (containerWidth < 400) return 1;
					if (containerWidth < 800) return 2;
					return 3;
				}}
				onClick={({ index }) => setIndex(index)}
			/>
			<Lightbox
				slides={photos}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				// enable optional lightbox plugins
				plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
			/>
		</Bounded>
	);
};

export default PhotoGrid;
