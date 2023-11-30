"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { translateTextMutation } from "../utils/translateTextMutation";
import { Word } from "@/utils/api/book/models/book.types";
import { useBookKey } from "@/utils/queryKeys/bookKey";

type UseTranslateWordProps = {
	refetchPageData: VoidFunction;
	updateSavedWords: VoidFunction;
	bookId: string | undefined;
};

export const useTranslateWord = ({
	refetchPageData,
	updateSavedWords,
	bookId,
}: UseTranslateWordProps) => {
	const [wordToTranslate, setWordToTranslate] = useState<Word | undefined>(
		undefined,
	);
	const queryClient = useQueryClient();
	const bookKey = useBookKey();

	const { mutate: updateWord, isPending: isUpdating } = useMutation({
		mutationFn: async (payload: Word) => {
			const res = await fetch("../api/word", {
				method: "POST",
				body: JSON.stringify(payload),
			});
			if (!res.ok) return null;
			const data = await res.json();

			return data;
		},
		onMutate: () => {
			refetchPageData();
			updateSavedWords();
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
			bookId &&
				queryClient.invalidateQueries({ queryKey: [bookKey.withId(bookId)] });
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
		isLoadingTranslation: isPending || isUpdating,
		setWordToTranslate,
	};
};
