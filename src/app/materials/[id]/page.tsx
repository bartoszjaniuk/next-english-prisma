import { SingleMaterialView } from "@/_views/materials/components/singleMaterialView/SingleMaterialView";
import { getBooksWithoutDetails } from "@/utils/api/book/getBooksWithoutDetails";
import { getCurrentPage } from "@/utils/api/book/getCurrentPage";
import React from "react";

export const generateStaticParams = async () => {
	const books = await getBooksWithoutDetails();
	return books.map((book) => ({
		id: book.id,
	}));
};

export const dynamicParams = true;

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
