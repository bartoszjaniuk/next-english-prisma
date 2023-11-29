import {
	Source_Code_Pro,
	Roboto_Mono,
	Raleway,
	Cormorant,
	Roboto,
	Open_Sans,
	Montserrat,
	Source_Sans_3,
	Noto_Sans,
	Oswald,
	Roboto_Slab,
	Fira_Sans,
	Poppins,
} from "next/font/google";

const roboto = Roboto({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--roboto",
});

const openSans = Open_Sans({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--openSans",
});

const montserrat = Montserrat({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--montserrat",
});

const poppins = Poppins({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--poppins",
});

const notoSans = Noto_Sans({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--notoSans",
});

const oswald = Oswald({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--oswald",
});

const sourceSans3 = Source_Sans_3({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--sourceSans3",
});

const firaSans = Fira_Sans({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--firaSans",
});

const robotoSlab = Roboto_Slab({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--robotoSlab",
});

const sourceSansPro = Source_Code_Pro({
	weight: "400",
	display: "swap",
	preload: true,
	subsets: ["latin"],
	variable: "--font-source-sans-pro",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto-mono",
});

const raleway = Raleway({
	subsets: ["latin"],
	display: "swap",
	preload: true,
	variable: "--font-raleway",
});

const cormorant = Cormorant({
	subsets: ["latin"],
	display: "swap",
	preload: true,
	variable: "--cormorant",
});

export const Font = {
	sourceSansPro,
	robotoMono,
	raleway,
	cormorant,
	roboto,
	openSans,
	firaSans,
	montserrat,
	poppins,
	robotoSlab,
	notoSans,
	sourceSans3,
	oswald
} as const;
