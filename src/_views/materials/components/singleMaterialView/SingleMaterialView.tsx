"use client";
import { CurrentPage } from "@/utils/api/book/models/book.types";
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
		<main className="w-full h-full justify-center flex flex-col items-center py-6">
			<BookReader
				isPageLoading={isPageLoading}
				refetchPageData={refetchPageData}
				data={data}
			/>
		</main>
	);
};
