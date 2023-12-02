import React, { PropsWithChildren } from "react";

export const ToolDropdown = ({ children }: PropsWithChildren) => {
	return (
		<div className="bg-layoutLight text-gray-900  dark:bg-layoutDark dark:text-white absolute top-12 left-0 md:top-0 mt-12 w-full px-5  h-[calc(100svh-200px)] md:h-[calc(100vh-70px)] z-50 border scroll-auto overflow-scroll">
			{children}
		</div>
	);
};
