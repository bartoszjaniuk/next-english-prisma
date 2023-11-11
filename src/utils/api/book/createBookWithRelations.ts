import { User } from "next-auth";
import prisma from "../../connect";
import { Book } from "./models/book.types";

export const createBookForCurrentUser = async ({ book, user, imageUrl, bookTitle }: { book: Book, user: User, imageUrl: string, bookTitle: string }) => {
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
        const createdPageId = createdBook.pages.find((p) => p.pageNumber === page.numberOfPage)?.id;
        if (createdPageId) {
            wordsToCreate.push(...page.words.map(word => ({
                ...word,
                pageId: createdPageId,
            })));
        }
    }
    await prisma.word.createMany({
        data: wordsToCreate,
    });

    return createdBook;
}




