import { clsx } from "clsx";
import React from "react";

type BoundedProps = {
	as?: React.ElementType;
	className?: string;
	children?: React.ReactNode;
};

export default function Bounded({
	as: Container = "section",
	className,
	children,
	...restProps
}: BoundedProps) {
	return (
		<Container
			className={clsx("px-4 py-14 first:pt-10 md:px-6 md:py-20 ", className)}
			{...restProps}
		>
			<div className="flex flex-col items-center w-full max-w-6xl mx-auto">
				{children}
			</div>
		</Container>
	);
}
