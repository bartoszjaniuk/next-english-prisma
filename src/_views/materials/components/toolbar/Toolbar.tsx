import React, { PropsWithChildren } from "react";
import { ProgressBar } from "../bookNavigation/components/progressBar/ProgressBar";

type ToolbarProps = {
	progress: number;
};

export const Toolbar = ({
	progress,
	children,
}: PropsWithChildren<ToolbarProps>) => {
	return (
		<div className=" w-full lg:w-[700px] flex flex-col md:flex-row md:items-center gap-2  mb-2">
			<ProgressBar progressPercentage={progress} />
			{children}
		</div>
	);
};
