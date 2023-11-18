import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeMode = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const renderThemeToggler = (isSidebarMode: boolean = false) => {
		const currentTheme = theme === "system" ? systemTheme : theme;
		if (!isMounted) return null;

		const toggleTheme = () => {
			if (currentTheme === "dark") return setTheme("light");
			setTheme("dark");
		};

		if (isSidebarMode) {
			return (
				<button
					type="button"
					className="flex gap-2 border-none rounded-none"
					onClick={toggleTheme}
				>
					<span className="text-2xl block float-left">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-10 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/>
						</svg>
					</span>
				</button>
			);
		}
	};

	return { renderThemeToggler };
};
