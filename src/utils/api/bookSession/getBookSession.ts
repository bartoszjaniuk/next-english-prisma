import prisma from "@/utils/connect";
import { BookSession } from "../book/models/book.types";

export const getBookSession = async (
	bookId: string,
): Promise<BookSession | null> => {
	const session = await prisma.bookSession.findUnique({
		where: {
			bookId,
		},
		select: {
			bookId: true,
			currentPage: true,
			progress: true,
			id: true,
			totalPages: true,
		},
	});

	if (!session) {
		Response.json({ message: "Nie znaleziono sesji" });
		return null;
	}

	return session;
};
