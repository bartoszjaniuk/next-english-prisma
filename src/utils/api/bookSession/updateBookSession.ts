import prisma from "@/utils/connect";

export const updateBookSession = async (
	bookId: string,
	currentPage: number,
) => {
	const book = await prisma.book.findUnique({
		where: {
			id: bookId,
		},
		select: {
			totalPages: true,
		},
	});

	if (!book) return null;

	const res = await prisma.bookSession.update({
		where: {
			bookId,
		},
		data: {
			currentPage: currentPage,
			progress: (currentPage / book.totalPages) * 100,
		},
	});

	return res;
};
