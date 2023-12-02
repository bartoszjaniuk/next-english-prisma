import React from "react";

export const BookScreen = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="
		p-4
		relative 
		w-full
		lg:w-[700px]	
		text-lg  
		overflow-y-scroll 

		md:p-6 
		md:pb-14 
		bg-white 
		border 
		border-gray-200  
		dark:bg-gray-800 
		dark:border-gray-700 
		text-justify
		flex
		gap-2
		flex-wrap
		"
		>
			{children}
		</div>
	);
};
