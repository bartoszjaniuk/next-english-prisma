"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type CardProps = {
	title: string;
	imageUrl?: string;
	pagesNumber: number;
	progressNumber: number;
	savedWordsNumber: number;
	id: string;
};

export const Card = ({
	title,
	imageUrl,
	pagesNumber,
	progressNumber,
	savedWordsNumber,
	id,
}: CardProps) => {
	const router = useRouter();
	const handleNavigate = () => router.push(`/materials/${id}`);
	return (
		<div
			className="w-[350px] bg-layoutLight dark:bg-layoutDark rounded overflow-hidden shadow-lg hover:cursor-pointer"
			onClick={handleNavigate}
		>
			<Image
				className="h-72 w-full object-contain"
				src={imageUrl as string}
				alt="Sunset in the mountains"
				width={400}
				height={400}
			/>
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">{title}</div>
			</div>
			<div className="px-6 pt-4 pb-2">
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
					Number of pages: {pagesNumber}
				</span>
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
					Progress: {progressNumber}%
				</span>
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
					Saved words: {savedWordsNumber}
				</span>
			</div>
		</div>
	);
};
