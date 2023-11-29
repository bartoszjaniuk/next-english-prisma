"use client";
import { CurrentPage } from "@/utils/api/book/models/book.types";
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
	} = useTranslateWord({ refetchPageData, updateSavedWords });

	return (
		<>
			<Loader size="12" isLoading={isPageLoading} />
			{!isPageLoading && data && (
				<BookNavigationContainer
					session={data.session}
					refetchPageData={refetchPageData}
				>
					<BookScreen>
						{data.words.map((word, i) =>
							word.isTranslated ? (
								<CustomTooltip
									onClick={() => null}
									isTranslationLoading={false}
									translation={word.translation}
									text={word.content}
									key={`${i}-translated`}
								>
									<span className="text-primary pb-1 ">
										{word.content + " "}
									</span>
								</CustomTooltip>
							) : (
								<CustomTooltip
									text={word.content}
									onClick={() => {
										setWordToTranslate(word);
										translateText(word.content);
									}}
									isTranslationLoading={isLoadingTranslation}
									translation={translation?.translatedText}
									key={`${i}-not-translated`}
								>
									<span
										className={`hover:border-primary border-transparent border-b-2 rounded-b-lg pb-1`}
									>
										{word.content + " "}
									</span>
								</CustomTooltip>
							),
						)}
					</BookScreen>
				</BookNavigationContainer>
			)}
		</>
	);
};
