'use client'
import { useThemeMode } from "@/hooks/useThemeMode/useThemeMode";

export const Header = () => {
    const { renderThemeToggler } = useThemeMode();

    return (
        <header className="absolute right-10 top-9 hidden sm:block">{renderThemeToggler()}</header>
    );
};
