"use client";
import React, { PropsWithChildren } from "react";
import { fallbackRender } from "@/components/fallbackRender/FallbackRender";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "next-themes";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components/layout/Layout";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const AppProviders = ({
	children,
	session,
}: PropsWithChildren<{ session: Session | null }>) => {
	return (
		<SessionProvider session={session}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<ErrorBoundary fallbackRender={fallbackRender}>
					<ReactQueryProvider>
						{/* <ReactQueryDevtools initialIsOpen={false} /> */}
						<Layout>{children}</Layout>
					</ReactQueryProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</SessionProvider>
	);
};
