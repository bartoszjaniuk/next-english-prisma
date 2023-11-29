import { useBookKey } from "@/utils/queryKeys/bookKey";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useFontFromQuery = () => {
	const queryClient = useQueryClient();
	const bookKey = useBookKey();
	const params = useParams();
	const id = params.id as string;

	const invalidateQuery = (queryKey: string) =>
		queryClient.invalidateQueries({ queryKey: [queryKey] });
	return {
		queryClient,
		bookKey,
		id,
		invalidateQuery,
	};
};
