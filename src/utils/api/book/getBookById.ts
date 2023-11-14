import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { SingleBook } from "./models/book.types";



export const getBookById = async (bookId: string): Promise<SingleBook | null> => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            Response.redirect('/api/auth/signin');
            return null;
        }

        const user = await prisma.user.findFirst({
            where: {
                email: session?.user?.email
            }
        });

        if (!user) {
            Response.json({ message: 'Nie znaleziono uzytkownika' });
            return null;
        }

        const book = await prisma.book.findUnique({
            where: { id: bookId }, include: {
                pages: true,
            }
        },)

        if (!book) return null;

        return book;

    } catch (error) {
        console.log(error);
        return null;
    }
}