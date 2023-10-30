import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const checkSessionAndReturnUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.redirect('/api/auth/signin');

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email
        }
    });

    if (!user) return NextResponse.json({ message: 'Nie znaleziono uzytkownika' })

    return user;
}