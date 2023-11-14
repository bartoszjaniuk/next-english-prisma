"use client";
import { BookSession } from "@/utils/api/book/models/book.types";
import React from "react";
import { useBookNavigation } from "./hooks/useBookNavigation";
import { BookNavigation } from "./BookNavigation";

type BookNavigationContainerProps = {
	session: BookSession;
	children: (pageNumber: number) => React.ReactNode;
	refetchPageData: () => void;
};

export const BookNavigationContainer = ({
	session,
	children,
	refetchPageData,
}: BookNavigationContainerProps) => {
	const { currentPage, handleChangePage, progress, isSessionUpdating } =
		useBookNavigation({ session, refetchPageData });

	return (
		<BookNavigation
			currentPage={currentPage}
			handleChangePage={handleChangePage}
			progress={progress}
			isSessionUpdating={isSessionUpdating}
		>
			{children}
		</BookNavigation>
	);
};
