import { z } from "zod";
import { PASSWORD_REGEX } from "@/utils/api/user/constants/passwordRegex.consts";

export const RegisterFormSchema = z
	.object({
		email: z
			.string()
			.min(1, "Email jest wymagany")
			.email("Invalid email address"),
		password: z.string().refine((password) => password.match(PASSWORD_REGEX), {
			message:
				"Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character",
		}),
		passwordConfirm: z.string().min(1, "This field is required"),
	})
	.refine((field) => field.password === field.passwordConfirm, {
		path: ["passwordConfirm"],
		message: "Password does not match",
	});

export type RegisterFormFieldValues = z.infer<typeof RegisterFormSchema>;
