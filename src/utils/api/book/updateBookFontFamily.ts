import prisma from "@/utils/connect";

export const updateBookFontFamily = async (
	bookId: string,
	fontStyle: string,
) => {
	const updatedBook = await prisma.book.update({
		where: {
			id: bookId,
		},
		data: {
			fontStyle,
		},
	});

	return updatedBook;
};
