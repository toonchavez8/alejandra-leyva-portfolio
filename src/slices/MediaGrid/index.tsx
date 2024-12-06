"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Bounded from "@/components/atomic/Bounded";

type MediaGridProps = {
	slice: {
		slice_type: string;
		variation: string;
		primary: {
			mediastories: Array<{ page_link: { url: string } }>;
		};
	};
};

type Metadata = {
	title: string;
	description: string;
	image: string;
	siteName: string;
};

const fetchMetadata = async (url: string): Promise<Metadata> => {
	try {
		const response = await axios.get(`/api/fetch-metadata?url=${url}`);
		return response.data;
	} catch {
		return {
			title: "Unknown",
			description: "No description available",
			image: "/placeholder-image.png",
			siteName: "N/A",
		};
	}
};

const MediaGrid = ({ slice }: MediaGridProps): JSX.Element => {
	const [metaData, setMetaData] = useState<Metadata[]>([]);

	useEffect(() => {
		const fetchAllMetadata = async () => {
			const data = await Promise.all(
				slice.primary.mediastories.map((story) =>
					fetchMetadata(story.page_link.url)
				)
			);
			setMetaData(data);
		};

		fetchAllMetadata();
	}, [slice]);

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="media-grid">
				{metaData.map((data, index) => (
					<a
						key={index}
						href={slice.primary.mediastories[index].page_link.url}
						className="media-card"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={data.image}
							alt={data.title}
							className="media-card-image"
						/>
						<div className="media-card-content">
							<h3 className="media-card-title">{data.title}</h3>
							<p className="media-card-description">{data.description}</p>
							<span className="media-card-site">{data.siteName.charAt(0)}</span>
						</div>
					</a>
				))}
			</div>
		</Bounded>
	);
};

export default MediaGrid;
