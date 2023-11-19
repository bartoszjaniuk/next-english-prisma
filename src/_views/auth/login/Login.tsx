import Image from "next/image";
import React, { ReactNode } from "react";

type LoginProps = {
	loginForm: ReactNode;
};

export const Login = ({ loginForm }: LoginProps) => {
	return (
		<main className="flex min-h-screen">
			<div className="container responsive-padding w-full md:w-[385px]  bg-backgroundLight dark:bg-layoutDark">
				{loginForm}
			</div>
			<div className=" hidden md:flex md:w-[calc(100vw-385px)] container responsive-padding bg-primary flex-col">
				<div className="w-[385px] pt-48 lg:pt-1/2">
					<Image
						className="animate-float"
						src="/assets/login.png"
						width={600}
						height={600}
						alt="Pies Chihuaua jako astronauta"
					/>
				</div>
			</div>
		</main>
	);
};
