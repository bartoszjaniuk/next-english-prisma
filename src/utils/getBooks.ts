export const getBooks = async (): Promise<any[]> => {
	const res = await fetch(
		`${process.env.NEXTAUTH_URL}/api/booksWithoutDetails`,
	);
	const books = await res.json();

	return books.data;
};
