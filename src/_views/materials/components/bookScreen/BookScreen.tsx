import React from "react";

export const BookScreen = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="relative 
		w-full
		h-[calc(100vh-250px)]
		md:h-[calc(100vh-200px)]
		md:w-[700px]	
		text-lg  
		overflow-y-scroll 
		block px-4 md:p-6 
		md:pb-14 
		bg-white border 
		border-gray-200  
		dark:bg-gray-800 
		dark:border-gray-700 
		text-justify"
		>
			{children}
		</div>
	);
};
