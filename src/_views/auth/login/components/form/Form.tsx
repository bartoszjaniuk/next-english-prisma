'use client'
import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormProps } from '../models/loginForm.types';
import { Input } from '@/components/input/Input';
import { SignLayout } from '@/_views/shared/signLayout/SignLayout';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormFieldValues, LoginFormSchema } from '../models/loginFormSchema.types';

type FormProps = {
    toggleFlow: VoidFunction;
}

export const Form = ({ toggleFlow }: FormProps) => {
    const {
        reset,
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState: { errors, isValid, isSubmitting },
    } = useForm<LoginFormFieldValues>({
        mode: "all",
        resolver: zodResolver(LoginFormSchema)
    });

    const [isPasswordInputVisible, setIsPasswordInputVisible] = useState(false)
    const togglePasswordInputVisibility = () => setIsPasswordInputVisible((prev) => !prev);

    const isEmailDirty = getFieldState('email').isDirty
    const isEmailInvalid = getFieldState('email').invalid

    const isButtonVisible = isEmailDirty && !isEmailInvalid;


    const onSubmit = async (data: LoginFormProps) => {
        await signIn('credentials', data);
        reset();
    } 

    return (
        <SignLayout toggleFlow={toggleFlow} isLogin>
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

                {isPasswordInputVisible && <Input
                    id="password"
                    type="password"
                    name="password"
                    label="Hasło"
                    placeholder="Podaj hasło"
                    register={register}
                    errors={errors}
                />}
                {!isPasswordInputVisible && <button
                    className="bg-primary text-white active:bg-emerald-600 w-full lg:w-auto  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    type="button"
                    onClick={togglePasswordInputVisibility}
                    disabled={!isButtonVisible}
                >
                    Dalej
                </button>}

                {isPasswordInputVisible && <button
                    className="bg-primary text-white active:bg-emerald-600 w-full lg:w-auto  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!isValid}
                >
                    Zaloguj się
                </button>}

            </form>
        </SignLayout>
    )
}
