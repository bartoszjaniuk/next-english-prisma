"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { translateTextMutation } from "../utils/translateTextMutation";
import { Word } from "@/utils/api/book/models/book.types";

export const useTranslateWord = (refetchPageData: VoidFunction) => {
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
		onSuccess: () => refetchPageData(),
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
				translation: data.translatedText,
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
		wordToTranslate,
		setWordToTranslate,
	};
};
