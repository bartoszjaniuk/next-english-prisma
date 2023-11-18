import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { SavedWord } from "../book/models/book.types";

export const getSavedWords = async (id: string): Promise<SavedWord[] | []> => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			Response.redirect("/api/auth/signin");
			return [];
		}
		const user = await prisma.user.findFirst({
			where: {
				email: session?.user?.email,
			},
		});

		if (!user) {
			Response.json({ message: "Nie znaleziono uzytkownika" });
			return [];
		}

		const book = await prisma.book.findUnique({
			where: {
				id,
			},
			select: {
				savedWords: true,
			},
		});

		if (!book) return [];

		return book.savedWords;
	} catch (error) {
		console.log(error);
		return [];
	}
};
