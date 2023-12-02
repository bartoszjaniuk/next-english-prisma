"use client";
import { CurrentPage, Word } from "@/utils/api/book/models/book.types";
import React from "react";
import { useTranslateWord } from "./hooks/useTranslateWord";
import { Loader } from "@/_views/upload/components/loader/Loader";
import { BookNavigationContainer } from "../bookNavigation/BookNavigationContainer";
import { BookScreen } from "../bookScreen/BookScreen";
import { CustomTooltip } from "../customTooltip/CustomTooltip";
import { useSavedWords } from "../singleMaterialView/hooks/useSavedWords";

type BookReaderProps = {
	data?: CurrentPage | null;
	isPageLoading: boolean;
	refetchPageData: VoidFunction;
};

export const BookReader = ({
	isPageLoading,
	refetchPageData,
	data,
}: BookReaderProps) => {
	const { updateSavedWords } = useSavedWords();

	const {
		translation,
		translateText,
		isLoadingTranslation,
		setWordToTranslate,
	} = useTranslateWord({
		refetchPageData,
		updateSavedWords,
		bookId: data?.bookId,
	});

	return (
		<>
			<Loader size="12" isLoading={isPageLoading} />
			{!isPageLoading && data && (
				<BookNavigationContainer
					session={data.session}
					refetchPageData={refetchPageData}
				>
					<BookScreen>
						{data.words.map((word, i) => (
							<CustomTooltipWrapper
								key={i}
								word={word}
								isTranslationLoading={isLoadingTranslation}
								onClick={() => {
									setWordToTranslate(word);
									translateText(word.content);
								}}
							/>
						))}
					</BookScreen>
				</BookNavigationContainer>
			)}
		</>
	);
};

type CustomTooltipProps = {
	isTranslationLoading: boolean;
	word: Word;
	onClick: VoidFunction;
};

export const CustomTooltipWrapper = ({
	isTranslationLoading,
	word,
	onClick,
}: CustomTooltipProps) => {
	const handleClick = () => {
		if (word.isTranslated) return;
		onClick();
	};

	return (
		<CustomTooltip
			onClick={handleClick}
			isTranslationLoading={isTranslationLoading}
			translation={word.translation}
			text={word.content}
		>
			{word.isTranslated && (
				<span className="text-primary pb-1 ">{word.content}</span>
			)}
			{!word.isTranslated && (
				<span
					className={`hover:border-primary border-transparent border-b-2 rounded-b-lg pb-1`}
				>
					{word.content}
				</span>
			)}
		</CustomTooltip>
	);
};
