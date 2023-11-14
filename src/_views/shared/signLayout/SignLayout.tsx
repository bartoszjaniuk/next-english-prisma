import { signIn } from "next-auth/react";
import React, { PropsWithChildren } from "react";

export const SignLayout = ({
	children,
	isLogin = false,
	toggleFlow,
}: PropsWithChildren<{ isLogin?: boolean; toggleFlow: VoidFunction }>) => {
	const handleLoginWithGoogle = () =>
		signIn("google", {
			redirect: true,
		});

	return (
		<div
			className={`container py-12 ${
				isLogin ? "w-full" : "w-full md:w-[385px]"
			}`}
		>
			<h1 className="text-5xl py-8 text-primary">
				{isLogin ? "Logowanie" : "Rejestracja"}
			</h1>
			<button
				onClick={handleLoginWithGoogle}
				className="mb-3 flex w-full items-center justify-center rounded bg-layoutLight border text-layoutDark px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal transition duration-150 ease-in-out hover:-translate-y-[2px]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="mr-2 h-5 w-5"
					viewBox="0 0 48 48"
				>
					<path
						fill="#FFC107"
						d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
					/>
					<path
						fill="#FF3D00"
						d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
					/>
					<path
						fill="#4CAF50"
						d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
					/>
					<path
						fill="#1976D2"
						d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
					/>
				</svg>
				Google
			</button>
			<button
				disabled
				className="mb-3 flex w-full items-center justify-center rounded bg-layoutLight border text-layoutDark  px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal transition duration-150 ease-in-out "
				style={{
					cursor: "not-allowed",
					opacity: 0.5,
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="mr-2 h-5 w-5"
					viewBox="0 0 256 209"
				>
					<path
						fill="#55acee"
						d="M256 25.45a105.04 105.04 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435c0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"
					/>
				</svg>
				Twitter
			</button>
			<div className="pt-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
				<p className="mx-4 text-sm mb-0 text-center font-extralight dark:text-neutral-200">
					lub za pomocą maila i hasła
				</p>
			</div>
			{children}
			{isLogin && (
				<div className="pt-2 flex items-center gap-1">
					<p className="text-sm mb-0  font-extralight dark:text-neutral-200">
						Nie posiadasz konta?
					</p>
					<button
						className="font-light text-primary cursor-pointer"
						onClick={toggleFlow}
					>
						Zarejestruj się
					</button>
				</div>
			)}
			{!isLogin && (
				<div className="pt-2 flex items-center gap-1">
					<p className="text-sm mb-0  font-extralight dark:text-neutral-200">
						Masz juz konto?
					</p>
					<button
						className="font-light text-primary cursor-pointer"
						onClick={toggleFlow}
					>
						Zaloguj się
					</button>
				</div>
			)}
		</div>
	);
};
