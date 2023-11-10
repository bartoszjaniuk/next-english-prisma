'use client'
import { SignLayout } from '@/_views/shared/signLayout/SignLayout'
import { Input } from '@/components/input/Input'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormProps } from '../../constants/registerForm.consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormFieldValues, RegisterFormSchema } from '../../models/registerForm.types';

type FormProps = {
    toggleFlow: VoidFunction;
}

const registerUser = async (data: RegisterFormProps) => {
    await fetch('/api/auth/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    })
}


export const Form = ({ toggleFlow }: FormProps) => {

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormFieldValues>({
        mode: "all",
        resolver: zodResolver(RegisterFormSchema)
    });
    const onSubmit: SubmitHandler<RegisterFormProps> = async (data: RegisterFormProps) => {
        await registerUser(data);
        reset();
    }


    return (
        <SignLayout toggleFlow={toggleFlow}>
            <form className='pt-4 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Podaj swój email"
                    register={register}
                    errors={errors}
                />

                <Input
                    id="password"
                    type="password"
                    name="password"
                    label="Hasło"
                    placeholder="Podaj hasło"
                    register={register}
                    errors={errors}
                />

                <Input
                    id="passwordConfirm"
                    type="password"
                    name="passwordConfirm"
                    label="Powtórz hasło"
                    placeholder="Powtórz hasło"
                    register={register}
                    errors={errors}
                />


                <button
                    className="bg-primary text-white active:bg-emerald-600 w-full lg:w-auto  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!isValid}
                >
                    Zaloguj się
                </button>

            </form>
        </SignLayout>
    )
}
