export type Book = {
	totalPages: number;
	pages: Page[];
	title: string;
};

export type Page = {
	numberOfPage: number;
	words: Word[];
};

export type User = {
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
};

export type SavedWord = {
	id: string;
	content: string;
	translation: string;
	bookId: string;
};

export type BookSession = {
	id: string;
	currentPage: number;
	totalPages: number;
	progress: number;
	bookId: string;
};

export type SingleBook = {
	id: string;
	title: string;
	imageUrl: string | null;
	pages: SingleBookPage[];
};

type SingleBookPage = {
	id: string;
	pageNumber: number;
	bookId: string;
};

export type CurrentPage = {
	id: string;
	pageNumber: number;
	words: Word[];
	bookId: string;
	session: BookSession;
};

export type Word = {
	// id: string;
	// pageId: string;
	isTranslated: boolean;
	content: string;
	translation: string;
};
