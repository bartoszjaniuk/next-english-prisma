'use client'
import { Login } from '@/_views/auth/login/Login'
import { Form as LoginForm } from '@/_views/auth/login/components/form/Form'
import { Register } from '@/_views/auth/register/Register'
import { Form as RegisterForm } from '@/_views/auth/register/components/form/Form'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export const Auth = () => {
    const { data: session, status } = useSession()
    const [isLoginFlow, setIsLoginFlow] = useState(true);
    const toggleFlow = () => setIsLoginFlow((prev) => !prev);
    const isLoggedIn = status === 'authenticated';

    useEffect(() => {
        if (isLoggedIn) {
            location.href = '/'
        }
    }, [isLoggedIn])



    return (
        <>
            {isLoginFlow ? <Login loginForm={<LoginForm toggleFlow={toggleFlow} />} /> : <Register registerForm={<RegisterForm toggleFlow={toggleFlow} />} />}
        </>
    )
}

