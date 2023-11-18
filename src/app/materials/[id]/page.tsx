import { SingleMaterialView } from "@/_views/materials/components/singleMaterialView/SingleMaterialView";
import { getCurrentPage } from "@/utils/api/book/getCurrentPage";
import { getBooks } from "@/utils/getBooks";
import React from "react";

export const generateStaticParams = async () => {
	const books = await getBooks();
	return books.map((book) => ({
		id: book.id,
	}));
};

type MaterialPageProps = {
	params: {
		id: string;
	};
};

const MaterialPage = async ({ params }: MaterialPageProps) => {
	const currentPage = await getCurrentPage(params.id);
	return <SingleMaterialView currentPage={currentPage} />;
};

export default MaterialPage;
