"use client";
import { CurrentPage } from "@/utils/api/book/models/book.types";
import { useBookKey } from "@/utils/queryKeys/bookKey";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type UseCurrentPageProps = {
	initialData: CurrentPage | null;
};

export const useCurrentPage = ({ initialData }: UseCurrentPageProps) => {
	const params = useParams();
	const id = params.id as string;
	const bookKey = useBookKey();
	const { data, refetch, isLoading } = useQuery({
		initialData,
		queryKey: [bookKey.withId(id)],
		queryFn: async () => {
			const res = await fetch(`../api/page?id=${id}`);
			const data: { bookCurrentPage: CurrentPage } = await res.json();
			return data.bookCurrentPage;
		},
	});

	return {
		data,
		refetchPageData: refetch,
		isPageLoading: isLoading,
	};
};
