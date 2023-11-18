import { SavedWord } from "@/utils/api/book/models/book.types";
import { useBookKey } from "@/utils/queryKeys/bookKey";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type UseSavedWordsProps = {
	initialData: SavedWord[] | [];
};

export const useSavedWords = ({ initialData }: UseSavedWordsProps) => {
	const params = useParams();
	const id = params.id as string;
	const bookKey = useBookKey();
	const { data, refetch, isLoading } = useQuery({
		initialData,
		queryKey: [bookKey.savedWords(id)],
		queryFn: async () => {
			const res = await fetch(`../api/savedWords?id=${id}`);
			const data: { savedWords: SavedWord[] } = await res.json();
			return data.savedWords;
		},
	});

	return {
		savedWords: data,
		updateSavedWords: refetch,
		areSavedWordsLoading: isLoading,
	};
};
