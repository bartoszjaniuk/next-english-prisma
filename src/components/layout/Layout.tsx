'use client'
import { useState } from "react";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";
import { ContentWrapper } from "./components/contentWrapper/ContentWrapper";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const pathsWithoutSidebar = ["/login", "/register"];
    const isWithoutLayout = !pathsWithoutSidebar.some(
        (path) => path === pathname
    );
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen((prev) => !prev);

    return (
        <>
            {isWithoutLayout && (
                <div className="flex pb-[100px] md:pb-0 h-full w-full">
                    <Header />
                    {isWithoutLayout && (
                        <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
                    )}
                    {isWithoutLayout && (
                        <ContentWrapper isOpen={isOpen}>{children}</ContentWrapper>
                    )}
                    {!isWithoutLayout && children}
                </div>
            )}
            {!isWithoutLayout && (
                <div className="md:bg-backgroundLight md:dark:bg-backgroundDark  bg-layoutLight dark:bg-layoutDark">
                    <Header />
                    {children}
                </div>
            )}
        </>
    );
};
