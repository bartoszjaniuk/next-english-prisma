import prisma from "@/utils/connect";
import { Word } from "../book/models/book.types";

export const updateWord = async (newWord: Word) => {
	const word = await prisma.word.findUnique({
		where: {
			id: newWord.id,
		},
		select: {
			page: true,
		},
	});

	if (!word) {
		Response.json({ message: "Nie znaleziono słowa" });
		return null;
	}

	const updateExistingWord = await prisma.word.update({
		where: {
			id: newWord.id,
		},
		data: {
			content: newWord.content,
			isTranslated: true,
			translation: newWord.translation,
		},
	});

	const savedWord = await prisma.savedWord.create({
		data: {
			content: newWord.content,
			translation: newWord.translation,
			bookId: word.page.bookId,
		},
	});

	return word;
};
