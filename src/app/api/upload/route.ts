import { createBookForCurrentUser } from "@/utils/api/book/createBookWithRelations";
import { createSessionForNewBook } from "@/utils/api/book/createSessionForNewBook";
import { convertPdfIntoObject } from "@/utils/api/book/pdf/convertPdfIntoObject";
import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.redirect('/api/auth/signin');

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email
        }
    });

    if (!user) return NextResponse.json({ message: 'Nie znaleziono uzytkownika' })

    const data = await request.formData();

    const file: File | null = data.get('file') as unknown as File;

    const imageUrl = data.get('imageUrl') as string;
    const bookTitle = data.get('bookTitle') as string;
    if (!file) {
        return NextResponse.json({ success: false })
    }

    const book = await convertPdfIntoObject(file);

    const newBook = await createBookForCurrentUser({ book, user, imageUrl, bookTitle })

    await createSessionForNewBook(newBook);

    const createdBook = await prisma.book.findUnique({
        where: { id: newBook.id },
        include: { pages: { include: { words: true } } },
    })


    return NextResponse.json({ createdBook })

}





