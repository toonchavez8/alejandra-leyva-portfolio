"use client";

import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
/**
 * Props for `TwoColContent`.
 */
export type TwoColContentProps =
	SliceComponentProps<Content.TwoColContentSlice>;

/**
 * Component for "TwoColContent" Slices.
 */
const TwoColContent = ({ slice }: TwoColContentProps): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="h-full "
		>
			<article className="flex flex-col-reverse h-full max-w-5xl gap-6 font-sans text-justify @xl:flex-col-reverse @2xl:flex-row">
				<PrismicRichText field={slice.primary.contenido} />
				<PrismicNextImage
					field={slice.primary.imagen}
					className="object-contain w-full mx-auto sm:min-w-40 md:min-w-80 max-w-96"
				/>
			</article>
			{slice.primary.cv_download && (
				<div className="self-start mt-10 md:mt-[8.7rem] max-w-5xl ">
					<PrismicNextLink
						field={slice.primary.cv_download}
						className="inline-block"
						target="_blank"
						rel="noopener noreferrer"
						download
						data-testid="cv-download"
					>
						<Button variant="outline">
							Download CV
							<Download className="w-4 h-4 mr-2" />
						</Button>
					</PrismicNextLink>
				</div>
			)}
		</Bounded>
	);
};

export default TwoColContent;
