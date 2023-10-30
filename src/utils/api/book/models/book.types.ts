export type Book =
    {
        totalPages: number;
        pages: Page[];
        title: string;
    }

export type Word = {
    isTranslated: boolean;
    translation: string;
    content: string;
}

export type Page = {
    numberOfPage: number;
    words: Word[]
}

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;

}
