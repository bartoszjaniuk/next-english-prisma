export const shapeFontName = (input: string): string =>
	input
		.split(/(?=[A-Z0-9])/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
