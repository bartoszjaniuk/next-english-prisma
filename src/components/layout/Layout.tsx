"use client";
import { useState } from "react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { ContentWrapper } from "./components/contentWrapper/ContentWrapper";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const pathsWithoutSidebar = ["/signin", "/signup"];
	const isWithoutLayout = !pathsWithoutSidebar.some((path) =>
		pathname.includes(path),
	);

	const [isOpen, setIsOpen] = useState(false);
	const toggleIsOpen = () => setIsOpen((prev) => !prev);

	return (
		<>
			{isWithoutLayout && (
				<div className="flex  md:pb-0 min-h-full  w-full">
					<Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
					<ContentWrapper isOpen={isOpen}>{children}</ContentWrapper>
				</div>
			)}
			{!isWithoutLayout && (
				<div className="md:bg-backgroundLight md:dark:bg-backgroundDark  bg-layoutLight dark:bg-layoutDark min-h-screen">
					{children}
				</div>
			)}
		</>
	);
};
