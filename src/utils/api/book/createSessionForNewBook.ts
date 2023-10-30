import prisma from '@/utils/connect';


type NewBook = {
    pages: {
        id: string;
        pageNumber: number;
        bookId: string;
    }[];
} & {
    id: string;
    title: string;
    totalPages: number;
    userId: string;

}

export const createSessionForNewBook = async (newBook: NewBook) => {
    await prisma.bookSession.create({
        data: {
            book: {
                connect: {
                    id: newBook.id
                }
            },
            currentPage: 1,
            totalPages: newBook.totalPages,
            progress: 0,

        }
    })
}