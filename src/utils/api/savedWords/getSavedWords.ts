import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { SavedWord } from "../book/models/book.types";

export type SavedWordsReturnType = {
	savedWords: SavedWord[] | [];
	fontStyle: string | null;
};

export const getSavedWords = async (
	id: string,
): Promise<SavedWordsReturnType> => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			Response.redirect("/api/auth/signin");
			return { fontStyle: null, savedWords: [] };
		}
		const user = await prisma.user.findFirst({
			where: {
				email: session?.user?.email,
			},
		});

		if (!user) {
			Response.json({ message: "Nie znaleziono uzytkownika" });
			return { fontStyle: null, savedWords: [] };
		}

		const book = await prisma.book.findUnique({
			where: {
				id,
			},
			select: {
				savedWords: true,
				fontStyle: true,
			},
		});

		if (!book) return { fontStyle: null, savedWords: [] };

		return {
			savedWords: book?.savedWords,
			fontStyle: book?.fontStyle,
		};
	} catch (error) {
		console.log(error);
		return { fontStyle: null, savedWords: [] };
	}
};
