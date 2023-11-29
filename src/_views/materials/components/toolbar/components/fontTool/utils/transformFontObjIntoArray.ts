import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { shapeFontName } from "./shapeFontName";

export type NextFontWithName = {
	name: string;
} & NextFontWithVariable;

type FontMap = Record<string, NextFontWithVariable>;

export const transformObjectToArray = (fonts: FontMap): NextFontWithName[] => {
	return Object.keys(fonts).map((fontName) => ({
		name: shapeFontName(fontName),
		...fonts[fontName],
	}));
};
