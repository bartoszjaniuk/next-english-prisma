import React, { ReactNode } from 'react'
import Image from 'next/image'


type RegisterProps = {
    registerForm: ReactNode;
}

export const Register = ({ registerForm }: RegisterProps) => {
    return (
        <main className='flex min-h-screen'>
            <div className=' hidden md:block w-full md:w-[385px]  bg-primary '>
                <div className='pt-48 lg:pt-1/2 w-full'>
                    <Image className='animate-float' src='/assets/astronaut.png' width={600} height={600} alt='Pies Chihuaua jako astronauta' />
                </div>
            </div>
            <div className='md:flex md:w-[calc(100vw-385px)] container responsive-padding bg-backgroundLight dark:bg-layoutDark flex-col'>
                {registerForm}
            </div>
        </main>
    )
}
