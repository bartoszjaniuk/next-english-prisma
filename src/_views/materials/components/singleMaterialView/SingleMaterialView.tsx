"use client";
import { CurrentPage, SavedWord } from "@/utils/api/book/models/book.types";
import React from "react";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { BookReader } from "../bookReader/BookReader";

type SingleMaterialViewProps = {
	currentPage: CurrentPage | null;
};

export const SingleMaterialView = ({
	currentPage,
}: SingleMaterialViewProps) => {
	const { data, isPageLoading, refetchPageData } = useCurrentPage({
		initialData: currentPage,
	});

	return (
		<main className="mb-[100px] w-full pt-4 flex flex-col items-center">
			<BookReader
				isPageLoading={isPageLoading}
				refetchPageData={refetchPageData}
				data={data}
			/>
		</main>
	);
};
