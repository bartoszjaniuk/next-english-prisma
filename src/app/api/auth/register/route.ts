import { PASSWORD_REGEX } from "@/utils/api/user/constants/passwordRegex.consts";
import { RegisterFromProps } from "@/utils/api/user/models/register";
import prisma from "@/utils/connect";
import { hashPassword } from "@/utils/api/user/hashPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data: RegisterFromProps = await req.json();
        const { email, password } = data;

        const isUserInDb = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        const isPasswordValid = password.match(PASSWORD_REGEX);

        if (isUserInDb) return NextResponse.json({ user: null, message: 'Uzytkownik o podanym adresie email juz istnieje' }, { status: 409 })

        if (!isPasswordValid) return NextResponse.json({ user: null, message: 'Podane hasło nie spełnia wymagań bezpieczeństwa' }, { status: 400 })

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })

        return NextResponse.json({
            id: newUser.id,
            email: newUser.email,
            image: newUser.image
        });

    } catch (error) {
        console.log(error);
    }
}