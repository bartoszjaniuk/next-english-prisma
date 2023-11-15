import { User } from "next-auth";
import prisma from "../../connect";

type NewBook = {
	totalPages: number;
	pages: NewPage[];
	title: string;
};

type NewPage = {
	numberOfPage: number;
	words: NewWord[];
};

type NewWord = {
	isTranslated: boolean;
	translation: string;
	content: string;
};

export const createBookForCurrentUser = async ({
	book,
	user,
	imageUrl,
	bookTitle,
}: {
	book: NewBook;
	user: User;
	imageUrl: string;
	bookTitle: string;
}) => {
	const createdBook = await prisma.book.create({
		data: {
			title: bookTitle,
			totalPages: book.totalPages,
			imageUrl,
			user: {
				connect: {
					id: user.id,
				},
			},
			pages: {
				create: book.pages.map(({ numberOfPage }) => ({
					pageNumber: numberOfPage,
				})),
			},
		},
		include: {
			pages: true,
		},
	});

	const wordsToCreate = [];
	for (const page of book.pages) {
		const createdPageId = createdBook.pages.find(
			(p) => p.pageNumber === page.numberOfPage,
		)?.id;
		if (createdPageId) {
			wordsToCreate.push(
				...page.words.map((word) => ({
					...word,
					pageId: createdPageId,
				})),
			);
		}
	}
	await prisma.word.createMany({
		data: wordsToCreate,
	});

	return createdBook;
};
