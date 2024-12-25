import Bounded from "@/components/atomic/Bounded";
import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
	PrismicRichText,
	SliceComponentProps,
	JSXMapSerializer,
} from "@prismicio/react";

const components: JSXMapSerializer = {
	hyperlink: ({ node, children }) => {
		return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
	},
	label: ({ node, children }) => {
		if (node.data.label === "codespan") {
			return <code>{children}</code>;
		}
	},
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
	return (
		<Bounded className="flex flex-col text-balance">
			<article className="flex flex-col  max-w-4xl @lg:max-w-4xl @sm:max-w-3xl -mt-10 prose text-balance">
				<PrismicRichText
					field={slice.primary.content}
					components={{
						heading1: ({ children }) => (
							<h1 className="text-2xl @md:text-4xl text-balance font-italiana @3xl:-ms-8">
								{children}
							</h1>
						),
						heading2: ({ children }) => (
							<h2 className="text-xl @md:text-2xl font-italiana @3xl:-ms-8">
								{children}
							</h2>
						),
						heading3: ({ children }) => (
							<h3 className="text-lg @md:text-xl">{children}</h3>
						),
						heading4: ({ children }) => (
							<h4 className="text-sm @md:text-lg">{children}</h4>
						),
						heading5: ({ children }) => (
							<h5 className="text-sm @md:text-lg">{children}</h5>
						),
						heading6: ({ children }) => (
							<h6 className="text-sm @md:text-base">{children}</h6>
						),
						paragraph: ({ children }) => (
							<p className="text-sm @md:text-base  ">{children}</p>
						),
						image: ({ node }) => (
							<img src={node.url} className="w-full max-w-3xl mx-auto " />
						),
						oListItem: ({ children }) => (
							<li className="text-sm @md:text-base ps-8 list-item list-decimal list-inside w-full">
								{children}
							</li>
						),
						list: ({ children }) => (
							<ul className="text-sm @md:text-base list-disc w-full">
								{children}
							</ul>
						),
					}}
				/>
			</article>
		</Bounded>
	);
};

export default RichText;
