import { Loader } from "@/_views/upload/components/loader/Loader";
import { SavedWord } from "@/utils/api/book/models/book.types";
import { useBookKey } from "@/utils/queryKeys/bookKey";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export const Clipboard = () => {
	const params = useParams();
	const id = params.id as string;
	const bookKey = useBookKey();
	const queryClient = useQueryClient();
	const wordsFromCache: { savedWords: SavedWord[] | [] } | undefined =
		queryClient.getQueryData([bookKey.savedWords(id)]);

	const areWordsAreLoading =
		queryClient.getQueryState([bookKey.savedWords(id)])?.status === "pending";

	const [isClipboardOpen, setIsClipboardOpen] = useState(false);
	const toggleClipboardOpen = () => setIsClipboardOpen((prev) => !prev);
	return (
		<div className="w-full text-center p-2 border rounded-lg bg-layoutLight text-gray-900  dark:bg-layoutDark dark:text-white whitespace-nowrap">
			<button
				className="hover:cursor-pointer w-full h-full"
				onClick={toggleClipboardOpen}
			>
				Clipboard
			</button>
			{isClipboardOpen && (
				<div className="bg-layoutLight text-gray-900  dark:bg-layoutDark dark:text-white absolute top-12 left-0 md:top-0 mt-12 w-full p-6 h-[calc(100vh-150px)] z-50 border scroll-auto overflow-scroll">
					<h1 className="text-2xl py-4">Clipboard of saving words</h1>
					<Loader size="12" isLoading={areWordsAreLoading} />
					{!areWordsAreLoading &&
						!!wordsFromCache &&
						wordsFromCache.savedWords.map((word) => (
							<div
								key={word.id}
								className="border-b-2 flex gap-1 whitespace-pre-wrap"
							>
								<p>{word.content}</p>
								<span>-</span>
								<p>{word.translation}</p>
							</div>
						))}
				</div>
			)}
		</div>
	);
};
