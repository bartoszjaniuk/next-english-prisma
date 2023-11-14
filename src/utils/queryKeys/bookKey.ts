export const useBookKey = () => {
	const bookKey = {
		base: "book",
		withId: (bookId: string) => `${bookKey.base}/${bookId}`,
		sessionWithId: (bookId: string) => `${bookKey.base}/${bookId}/bookSession`,
	};
	return bookKey;
};
