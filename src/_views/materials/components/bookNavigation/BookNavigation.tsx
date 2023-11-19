"use client";
import { Loader } from "@/_views/upload/components/loader/Loader";
import { ArrowIcon } from "@/components/icons/ArrowIcon/ArrowIcon";
import React from "react";
import { Toolbar } from "../toolbar/Toolbar";

type BookNavigationProps = {
	progress: number;
	currentPage: number;
	handleChangePage: (direction: "prev" | "next") => void;
	children: (pageNumber: number) => React.ReactNode;
	isSessionUpdating: boolean;
};

export const BookNavigation = ({
	currentPage,
	handleChangePage,
	progress,
	children,
	isSessionUpdating,
}: BookNavigationProps) => {
	return (
		<div className="relative py-2">
			<Toolbar progress={progress} />

			{children(currentPage)}
			<div className="flex items-center mt-4 justify-center">
				<ArrowIcon
					disabled={isSessionUpdating}
					onClick={() => handleChangePage("prev")}
					className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer"
				/>

				{isSessionUpdating && (
					<span className="text-base px-8">
						<Loader size="12" />
					</span>
				)}
				{!isSessionUpdating && (
					<span className="text-base px-4">Page {currentPage}</span>
				)}
				<ArrowIcon
					disabled={isSessionUpdating}
					onClick={() => handleChangePage("next")}
					className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer rotate-180"
				/>
			</div>
		</div>
	);
};
