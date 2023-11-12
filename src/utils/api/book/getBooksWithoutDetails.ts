import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";

type Books = {
    id: string;
    title: string;
    userId: string;
    totalPages: number;
    imageUrl: string | null;
    savedWords: SavedWord[];
    bookSession: BookSession | null;
}

type GetBooksReturnType = {
    id: string;
    title: string;
    userId: string;
    imageUrl: string | null;
    pagesNumber: number;
    progressNumber: number;
    savedWordsNumber: number;
}

type Page = {
    id: string;
    pageNumber: number;
    bookId: string;
}
type SavedWord = {
    id: string;
    content: string;
    translation: string;
    bookId: string;
}

type BookSession = {
    id: string;
    currentPage: number;
    totalPages: number;
    progress: number;
    bookId: string;
}




export const getBooksWithoutDetails = async (): Promise<GetBooksReturnType[] | []> => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            Response.redirect('/api/auth/signin');
            return [];
        }

        const user = await prisma.user.findFirst({
            where: {
                email: session?.user?.email
            }
        });

        if (!user) {
            Response.json({ message: 'Nie znaleziono uzytkownika' });
            return [];
        }


        const books: Books[] = await prisma.book.findMany({
            where: {
                userId: user?.id
            },
            select: {
                id: true,
                imageUrl: true,
                savedWords: true,
                totalPages: true,
                userId: true,
                title: true,
                bookSession: true,
            }
        })
        return books.map((book) => ({
            ...book,
            pagesNumber: book.totalPages,
            savedWordsNumber: book.savedWords.length,
            progressNumber: book?.bookSession?.progress || 0,
        }));
    } catch (error) {
        console.log(error);
        return []
    }
}