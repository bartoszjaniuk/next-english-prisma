import React from "react";

export const ContentWrapper = ({
	children,
	isOpen,
}: {
	children: React.ReactNode;
	isOpen: boolean;
}) => {
	return (
		<div
			data-testid="ContentWrapper--Container"
			className={`${
				isOpen ? "sm:pl-64" : "sm:pl-24"
			} transition-all px-7 w-full flex justify-center items-center h-full border-4 border-green-600`}
		>
			{children}
		</div>
	);
};
