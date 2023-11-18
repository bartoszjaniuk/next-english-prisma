import prisma from "@/utils/connect";
import { CurrentPage } from "./models/book.types";

export const getCurrentPage = async (
	bookId: string,
): Promise<CurrentPage | null> => {
	try {
		const bookSession = await prisma.bookSession.findUnique({
			where: {
				bookId: bookId,
			},
			select: {
				id: true,
				currentPage: true,
				progress: true,
				totalPages: true,
				bookId: true,
			},
		});

		if (!bookSession) return null;

		const currentPage = await prisma.page.findUnique({
			where: {
				bookId,
				pageNumber: bookSession?.currentPage,
			},
			select: {
				bookId: true,
				id: true,
				pageNumber: true,
				words: true,
			},
		});

		if (!currentPage) return null;

		const bookCurrentPage = {
			...currentPage,
			session: bookSession,
		};

		return bookCurrentPage;
	} catch (error) {
		console.log(error);
		return null;
	}
};
