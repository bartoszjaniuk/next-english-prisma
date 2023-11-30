import React from "react";
import { Tool } from "./components/tool/Tool";
import { ProgressBar } from "../bookNavigation/components/progressBar/ProgressBar";
import { Clipboard } from "./components/clipboard/Clipboard";
import { FontTool } from "./components/fontTool/FontTool";

type ToolbarProps = {
	progress: number;
};

export const Toolbar = ({ progress }: ToolbarProps) => {
	return (
		<div className=" w-full lg:w-[700px] flex flex-col md:flex-row md:items-center gap-2  mb-2">
			<ProgressBar progressPercentage={progress} />
			<div className="flex items-center gap-2">
				<Tool>
					<button disabled className="disabled:cursor-not-allowed">
						Font size
					</button>
				</Tool>
				<FontTool />
				<Clipboard />
			</div>
		</div>
	);
};
