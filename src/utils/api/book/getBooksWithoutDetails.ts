import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";

type GetBooksReturnType = {
    id: string,
    title: string,
    totalPages: number,
    userId: string;
    imageURL?: string;
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


        const books: GetBooksReturnType[] = await prisma.book.findMany({
            where: {
                userId: user?.id
            }
        })
        return books;
    } catch (error) {
        console.log(error);
        return []
    }
}