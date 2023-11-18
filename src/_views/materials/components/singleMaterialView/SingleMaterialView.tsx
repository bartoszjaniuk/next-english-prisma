"use client";
import { CurrentPage, SavedWord } from "@/utils/api/book/models/book.types";
import React from "react";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { BookReader } from "../bookReader/BookReader";
import { useSavedWords } from "./hooks/useSavedWords";

type SingleMaterialViewProps = {
	currentPage: CurrentPage | null;
	initialyLoadedSavedWords: SavedWord[] | [];
};

export const SingleMaterialView = ({
	currentPage,
	initialyLoadedSavedWords,
}: SingleMaterialViewProps) => {
	const { data, isPageLoading, refetchPageData } = useCurrentPage({
		initialData: currentPage,
	});

	const { savedWords, areSavedWordsLoading, updateSavedWords } = useSavedWords({
		initialData: initialyLoadedSavedWords,
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
