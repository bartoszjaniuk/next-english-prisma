import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import "../styles/globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { authOptions } from "@/utils/auth";

export const metadata: Metadata = {
	title: "Next Level English",
	description:
		"Place where you can read books in english and translate words to Polish",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-[100svh]">
				<AppProviders session={session}>{children}</AppProviders>
			</body>
		</html>
	);
}
