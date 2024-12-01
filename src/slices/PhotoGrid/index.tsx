"use client";
import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";
import {
	PrismicRichText,
	PrismicText,
	SliceComponentProps,
} from "@prismicio/react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState<number>(0);

	const imageGallery = slice.primary.grid_of_images;

	const openModal = (index: number) => {
		setCurrentImage(index);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const nextImage = () => {
		if (currentImage === imageGallery.length - 1) {
			setCurrentImage(0);
		} else {
			setCurrentImage(currentImage + 1);
		}
	};

	const previousImage = () => {
		if (currentImage === 0) {
			setCurrentImage(imageGallery.length - 1);
		} else {
			setCurrentImage(currentImage - 1);
		}
	};

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 masonry">
				{imageGallery.map((image, index) => (
					<div
						key={image.image.id}
						className="relative cursor-pointer"
						onClick={() => openModal(index)}
					>
						<PrismicNextImage
							field={image.image}
							className="h-auto max-w-full aspect aspect-auto"
						/>
					</div>
				))}
			</div>

			{/* Modal Carousel */}

			{isModalOpen && (
				<Dialog
					open={isModalOpen}
					onClose={closeModal}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
				>
					<div className="relative max-w-3xl">
						<button
							onClick={closeModal}
							className="absolute text-xl text-white top-4 right-4"
						>
							✕
						</button>

						<div className="relative">
							<PrismicNextImage
								field={imageGallery[currentImage].image}
								className="object-cover w-full h-auto"
							/>
							<div className="absolute flex justify-between w-full top-1/2">
								<button
									onClick={previousImage}
									className="p-2 text-white bg-black bg-opacity-60"
								>
									◀
								</button>
								<button
									onClick={nextImage}
									className="p-2 text-white bg-black bg-opacity-60"
								>
									▶
								</button>
							</div>
						</div>

						{/* Thumbnail List */}
						<div className="flex mt-4 space-x-2 overflow-x-auto">
							{imageGallery.map((img, index) => (
								<div
									key={index}
									className={clsx(
										"w-16 h-16 cursor-pointer",
										currentImage === index ? "ring-2 ring-purple-500" : ""
									)}
									onClick={() => setCurrentImage(index)}
								>
									<PrismicNextImage
										field={img.image}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
					</div>
				</Dialog>
			)}
		</Bounded>
	);
};

export default PhotoGrid;
