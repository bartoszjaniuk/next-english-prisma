import React, { PropsWithChildren } from "react";

export const Tool = (props: PropsWithChildren) => {
	return (
		<div className="w-full  text-center p-2 border rounded-lg bg-layoutLight text-gray-900  dark:bg-layoutDark dark:text-white whitespace-nowrap">
			{props.children}
		</div>
	);
};
