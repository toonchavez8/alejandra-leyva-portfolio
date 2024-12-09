"use client";
import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

/**
 * Props for `PhotoGrid`.
 */
export type PhotoGridProps = SliceComponentProps<Content.PhotoGridSlice>;

/**
 * Component for "PhotoGrid" Slices.
 */
const PhotoGrid = ({ slice }: PhotoGridProps): JSX.Element => {
	const [currentView, setCurrentView] = useState<"grid" | "gallery">("grid");
	const [currentImage, setCurrentImage] = useState<number>(0);

	const imageGallery = slice.primary.grid_of_images;

	const openGallery = (index: number) => {
		setCurrentImage(index);
		setCurrentView("gallery");
	};

	const closeGallery = () => {
		setCurrentView("grid");
	};

	const nextImage = () => {
		setCurrentImage((prev) =>
			prev === imageGallery.length - 1 ? 0 : prev + 1
		);
	};

	const previousImage = () => {
		setCurrentImage((prev) =>
			prev === 0 ? imageGallery.length - 1 : prev - 1
		);
	};

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			{/* Masonry Grid View */}
			{currentView === "grid" && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
					{imageGallery.map((image, index) => (
						<div
							key={image.image.id}
							className="relative cursor-pointer"
							onClick={() => openGallery(index)}
						>
							<PrismicNextImage
								field={image.image}
								className="h-auto max-w-full aspect aspect-auto"
							/>
						</div>
					))}
				</div>
			)}

			{/* Gallery View */}
			{currentView === "gallery" && (
				<div className="relative ">
					{/* Close Gallery Button */}
					<button
						onClick={closeGallery}
						className="absolute z-50 px-4 py-2 text-black border border-black rounded-full shadow-lg top-4 right-4"
					>
						✕
					</button>

					{/* Main Image View */}
					<div className="relative w-full mx-auto max-w-7xl">
						<PrismicRichText
							field={imageGallery[currentImage].image_description}
						/>
						<PrismicNextImage
							field={imageGallery[currentImage].image}
							className="object-contain w-full max-h-[75vh]"
						/>

						{/* Navigation Arrows */}
						<div className="absolute -translate-y-1/2 inset-y-1/2 left-4">
							<button
								onClick={previousImage}
								className="p-2 text-white bg-black rounded-full bg-opacity-60"
							>
								◀
							</button>
						</div>
						<div className="absolute -translate-y-1/2 inset-y-1/2 right-4">
							<button
								onClick={nextImage}
								className="p-2 text-white bg-black rounded-full bg-opacity-60"
							>
								▶
							</button>
						</div>
					</div>

					{/* Thumbnails */}
					<div className="relative mt-4">
						{/* Horizontal Scroll Container */}
						<div className="flex max-w-6xl gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
							{imageGallery.map((img, index) => (
								<div
									key={index}
									className={clsx(
										"flex-shrink-0 w-24 h-24 cursor-pointer rounded-md snap-center",
										currentImage === index ? "ring-2 ring-purple-500" : ""
									)}
									onClick={() => setCurrentImage(index)}
								>
									<PrismicNextImage
										field={img.image}
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							))}
						</div>

						{/* Overflow Indicators */}
						<div className="absolute top-0 bottom-0 left-0 flex items-center pointer-events-none bg-gradient-to-r from-white to-transparent">
							<div className="p-2 text-black">←</div>
						</div>
						<div className="absolute top-0 bottom-0 right-0 flex items-center pointer-events-none bg-gradient-to-l from-white to-transparent">
							<div className="p-2 text-black">→</div>
						</div>
					</div>
				</div>
			)}
		</Bounded>
	);
};

export default PhotoGrid;
