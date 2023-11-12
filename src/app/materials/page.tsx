import { Card } from "@/_views/materials/components/card/Card";
import { getBooksWithoutDetails } from "@/utils/api/book/getBooksWithoutDetails";
import React from "react";

const MaterialsPage = async () => {
	const books = await getBooksWithoutDetails();
	return (
		<main className="container responsive-padding flex gap-8">
			{books.map((book) => (
				<Card
					key={book.id}
					imageUrl={book.imageUrl || ""}
					pagesNumber={book.pagesNumber}
					progressNumber={book.progressNumber}
					savedWordsNumber={book.savedWordsNumber}
					title={book.title}
				/>
			))}
		</main>
	);
};

export default MaterialsPage;
