"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { translateTextMutation } from "../utils/translateTextMutation";
import { Word } from "@/utils/api/book/models/book.types";

type UseTranslateWordProps = {
	refetchPageData: VoidFunction;
	updateSavedWords: VoidFunction;
};

export const useTranslateWord = ({
	refetchPageData,
	updateSavedWords,
}: UseTranslateWordProps) => {
	const [wordToTranslate, setWordToTranslate] = useState<Word | undefined>(
		undefined,
	);

	const { mutate: updateWord } = useMutation({
		mutationFn: async (payload: Word) => {
			const res = await fetch("../api/word", {
				method: "POST",
				body: JSON.stringify(payload),
			});
			if (!res.ok) return null;
			const data = await res.json();

			return data;
		},
		onSuccess: () => {
			updateSavedWords();
			refetchPageData();
		},
	});

	const {
		data: translation,
		mutate: translateText,
		isPending,
	} = useMutation({
		mutationFn: translateTextMutation,
		onSuccess: (data) => {
			if (!wordToTranslate) return;
			updateWord({
				isTranslated: true,
				translation: data,
				content: wordToTranslate.content,
				id: wordToTranslate.id,
				pageId: wordToTranslate.pageId,
			});
		},
	});

	return {
		translation,
		translateText,
		isLoadingTranslation: isPending,
		setWordToTranslate,
	};
};
