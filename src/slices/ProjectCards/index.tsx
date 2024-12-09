import Bounded from "@/components/atomic/Bounded";
import { Content } from "@prismicio/client";
import {
	PrismicRichText,
	PrismicText,
	SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";

/**
 * Props for `ProjectCards`.
 */
export type ProjectCardsProps = SliceComponentProps<Content.ProjectCardsSlice>;

/**
 * Component for "ProjectCards" Slices.
 */ const ProjectCards = ({ slice }: ProjectCardsProps): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="-mb-20"
		>
			<div className="flex flex-col w-full">
				<h2 className="text-2xl font-italiana">
					<PrismicText field={slice.primary.section_title} />
				</h2>
				<div className="grid items-end gap-4 @md:grid-cols-2 @3xl:grid-cols-3 @sm:grid-cols-1 auto-rows-fr">
					{slice.primary.card_group.map((item) => (
						<PrismicNextLink key={item.card_title} field={item.page_link}>
							<article className="flex flex-col gap-2 p-4 justify-self-end text-balance ">
								<h3 className="text-lg ">{item.card_title}</h3>
								<PrismicNextImage
									field={item.gallery_image}
									className="object-cover aspect aspect-video"
								/>
								<Button variant={"link"} className="">
									{item.button_view || "Ver Galería"}
								</Button>
							</article>
						</PrismicNextLink>
					))}
				</div>
			</div>
		</Bounded>
	);
};

export default ProjectCards;
