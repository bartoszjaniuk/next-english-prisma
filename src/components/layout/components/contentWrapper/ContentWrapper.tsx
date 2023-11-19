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
			} transition-all px-7 my-[1.5rem] w-full flex justify-center items-center`}
		>
			{children}
		</div>
	);
};
