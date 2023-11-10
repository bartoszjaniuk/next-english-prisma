import { z } from "zod";
import { PASSWORD_REGEX } from "@/utils/api/user/constants/passwordRegex.consts";

export const RegisterFormSchema = z.object({
    email: z.string().min(1, 'Email jest wymagany').email('Nieprawiłowy adres email'),
    password: z.string().refine((password) => password.match(PASSWORD_REGEX), { message: 'Hasło musi zawierać co najmniej 8 znaków, w tym co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny' }),
    passwordConfirm: z.string().min(1, 'Pole jest wymagane')
}).refine((field) => field.password === field.passwordConfirm, { path: ['passwordConfirm'], message: 'Hasła nie są takie same' })

export type RegisterFormFieldValues = z.infer<typeof RegisterFormSchema>