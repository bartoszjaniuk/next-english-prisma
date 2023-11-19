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
		<div className="relative">
			<Toolbar progress={progress} />
			{children(currentPage)}
			<div className="flex items-center  justify-center">
				<button
					className="border w-full h-full "
					disabled={isSessionUpdating}
					onClick={() => handleChangePage("prev")}
				>
					Previous
					{/* <ArrowIcon
						disabled={isSessionUpdating}
						onClick={() => handleChangePage("prev")}
						className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer"
					/> */}
				</button>

				{isSessionUpdating && (
					<span className="text-base px-8">
						<Loader size="12" />
					</span>
				)}
				{!isSessionUpdating && (
					<button className="border w-full h-full">
						<span className="text-base px-4">Page {currentPage}</span>
					</button>
				)}
				<button className="border w-full">
					<ArrowIcon
						disabled={isSessionUpdating}
						onClick={() => handleChangePage("next")}
						className="w-10 h-10 bg-gray-200 text-gray-900 border dark:bg-gray-700 dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer rotate-180"
					/>
				</button>
			</div>
		</div>
	);
};
