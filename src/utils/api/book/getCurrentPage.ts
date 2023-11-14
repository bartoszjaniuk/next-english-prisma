import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { CurrentPage } from "./models/book.types";

export const getCurrentPage = async (
	bookId: string,
): Promise<CurrentPage | null> => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			Response.redirect("/api/auth/signin");
			return null;
		}
		const user = await prisma.user.findFirst({
			where: {
				email: session?.user?.email,
			},
		});

		if (!user) {
			Response.json({ message: "Nie znaleziono uzytkownika" });
			return null;
		}

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
