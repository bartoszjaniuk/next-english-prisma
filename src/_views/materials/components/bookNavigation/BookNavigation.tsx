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
			<div className="flex items-center justify-cente py-1">
				<button
					className=" w-full bg-layoutLight dark:bg-layoutDark border-r-2 py-1 flex items-center justify-center"
					disabled={isSessionUpdating}
					onClick={() => handleChangePage("prev")}
				>
					<ArrowIcon className="w-6 h-6 text-gray-900 border dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer mr-2" />
					Previous
				</button>

				{isSessionUpdating && (
					<div className="w-full bg-layoutLight dark:bg-layoutDark border-r-2 py-1 flex items-center justify-center">
						<Loader />
					</div>
				)}
				{!isSessionUpdating && (
					<div className="w-full bg-layoutLight dark:bg-layoutDark border-r-2 py-1 text-center">
						<span className="text-base px-4">Page {currentPage}</span>
					</div>
				)}
				<button
					className=" w-full bg-layoutLight dark:bg-layoutDark py-1 flex items-center justify-center"
					disabled={isSessionUpdating}
					onClick={() => handleChangePage("next")}
				>
					Next
					<ArrowIcon className="w-6 h-6 text-gray-900 border dark:text-white dark:border-backgroundDark text-3xl rounded-full shadow-sm p-1 cursor-pointer rotate-180 ml-2" />
				</button>
			</div>
		</div>
	);
};
