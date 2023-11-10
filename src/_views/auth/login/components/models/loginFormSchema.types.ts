import { PASSWORD_REGEX } from "@/utils/api/user/constants/passwordRegex.consts";
import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().min(1, 'Email jest wymagany').email('Nieprawiłowy adres email'),
    password: z.string().refine((password) => password.match(PASSWORD_REGEX), { message: 'Hasło musi zawierać co najmniej 8 znaków, w tym co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny' })
});

export type LoginFormFieldValues = z.infer<typeof LoginFormSchema>