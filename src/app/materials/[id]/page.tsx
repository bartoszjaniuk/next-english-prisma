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

	return (
		<div className="px-7 w-full h-[calc(100svh-80px)] md:h-screen border-4 border-purple-500-600">
			<SingleMaterialView currentPage={currentPage} />
		</div>
	);
};

export default MaterialPage;
