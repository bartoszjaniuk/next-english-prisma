import React, { useState } from "react";
import { Card } from "./card/Card";
import { Font } from "@/utils/fonts";
import {
	NextFontWithName,
	transformObjectToArray,
} from "./utils/transformFontObjIntoArray";
import { useFontStyle } from "@/hooks/useFontStyle/useFontStyle";
import { useUpdateFontFamily } from "./hooks/useUpdateFontFamily";
import { ToolDropdown } from "../toolDropdown/ToolDropdown";

export const FontTool = () => {
	const [isFontToolOpen, setIsFontToolOpen] = useState(false);
	const toggleFontToolOpen = () => setIsFontToolOpen((prev) => !prev);
	const googleFonts = transformObjectToArray(Font);
	const fontStyle = useFontStyle();

	const { updateFontStyle, isUpdating } = useUpdateFontFamily();

	const onOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFontStyle(event.target.value);
	};

	return (
		<div className="w-full p-2 border rounded-lg bg-layoutLight text-gray-900  dark:bg-layoutDark dark:text-white whitespace-nowrap">
			<button
				className="hover:cursor-pointer w-full h-full"
				onClick={toggleFontToolOpen}
			>
				Font style
			</button>
			{isFontToolOpen && (
				<ToolDropdown>
					<div className="flex flex-col md:flex-ro justify-between md:items-center border-b gap-2 py-4">
						<h1 className="text-2xl">Choose font style for your book</h1>
						<div className="text-sm ">
							Current font:{" "}
							<span className="font-medium underline">{fontStyle}</span>
						</div>
					</div>
					<div className="border-b-2 flex flex-col gap-2 whitespace-pre-wrap">
						{googleFonts.map((font, index) => (
							<Card
								isChecked={font.name === fontStyle}
								key={index}
								name={font.name}
								fontFamilyClassName={font.className}
								onOptionChange={onOptionChange}
								isUpdating={isUpdating}
							/>
						))}
					</div>
				</ToolDropdown>
			)}
		</div>
	);
};
