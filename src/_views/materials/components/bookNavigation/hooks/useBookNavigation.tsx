"use client";
import { BookSession } from "@/utils/api/book/models/book.types";
import { useBookKey } from "@/utils/queryKeys/bookKey";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type UseBookNavigationProps = {
	session: BookSession;
	refetchPageData: () => void;
};

export const useBookNavigation = ({
	refetchPageData,
	session,
}: UseBookNavigationProps) => {
	const [currentPage, setCurrentPage] = useState(session.currentPage);
	const [progress, setProgress] = useState(session.progress);
	const bookKey = useBookKey();
	const queryClient = useQueryClient();
	const router = useRouter();

	useQuery({
		initialData: session,
		queryKey: [bookKey.sessionWithId(session.bookId as string)],
		queryFn: async () => {
			const res = await fetch(`../api/bookSession?id=${session.bookId}`);
			if (!res.ok) return null;
			const data: { bookCurrentPage: BookSession } = await res.json();
			return data.bookCurrentPage;
		},
	});

	const { mutate: updateSession, isPending: isSessionUpdating } = useMutation({
		mutationFn: async ({
			bookId,
			currentPage,
		}: {
			bookId: string;
			currentPage: number;
		}) => {
			const res = await fetch(`../api/bookSession?id=${bookId}`, {
				method: "POST",
				body: JSON.stringify(currentPage),
			});
			const data = await res.json();
			return data;
		},
		onSuccess: () => {
			router.refresh();
			refetchPageData();
		},
	});

	const handleChangePage = (direction: "next" | "prev") => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
			queryClient.invalidateQueries({
				queryKey: [bookKey.withId(session.bookId)],
			});
			return updateSession({
				bookId: session.bookId,
				currentPage: currentPage + 1,
			});
		}
		if (currentPage <= 1) return;
		setCurrentPage((prev) => prev - 1);
		queryClient.invalidateQueries({
			queryKey: [bookKey.withId(session.bookId)],
		});
		return updateSession({
			bookId: session.bookId,
			currentPage: currentPage - 1,
		});
	};

	const calculateProgress = useCallback(
		(currentPage: number, totalPages: number) =>
			Math.floor((currentPage / totalPages) * 100),
		[],
	);

	useEffect(() => {
		setProgress(calculateProgress(currentPage, session.totalPages));
	}, [calculateProgress, currentPage, session.totalPages]);

	return {
		currentPage,
		progress,
		handleChangePage,
		isSessionUpdating,
	};
};
