import Image from 'next/image'
import React, { ReactNode } from 'react'

type LoginProps = {
    loginForm: ReactNode
}

export const Login = ({ loginForm }: LoginProps) => {
    return (
        <main className='flex min-h-screen'>
            <div className='container responsive-padding w-full md:w-[385px]  bg-backgroundLight dark:bg-layoutDark'>{loginForm}</div>
            <div className=' hidden md:flex md:w-[calc(100vw-385px)] container responsive-padding bg-primary flex-col'>
                {/* <div className='py-12 h-16 w-full lg:w-[600px]'>
                    <h1 className='text-4xl lg:text-7xl py-4 text-font font-semibold'>Wiedza to potęga.</h1>
                    <p className='font-extralight text-font'>Zanurz się w światy literatury bez barier językowych dzięki naszej aplikacji do czytania książek w języku angielskim. Wgrywaj własne tytuły, rozwijaj swoje umiejętności językowe i ciesz się płynnym czytaniem dzięki wbudowanemu narzędziu i funkcji tłumaczenia.</p>
                </div> */}
                <div className='w-[385px] pt-48 lg:pt-1/2'>
                    <Image className='animate-float' src='/assets/login.png' width={600} height={600} alt='Pies Chihuaua jako astronauta' />
                </div>
            </div>
        </main>
    )
}
