import { SingleMaterialView } from "@/_views/materials/components/singleMaterialView/SingleMaterialView";
import { getCurrentPage } from "@/utils/api/book/getCurrentPage";
import React from "react";

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
