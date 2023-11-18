import React from "react";
import { DragAndDropZone } from "../dragAndDropZone/DragAndDropZone";
import { Badge } from "../badge/Badge";

type FirstStepProps = {
	bookFile: File | undefined;
	bookFileRef: React.MutableRefObject<HTMLInputElement | null>;
	onBookFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveBookFile: () => void;
	errorMessage?: string;
};

export const FirstStep = ({
	bookFile,
	bookFileRef,
	onBookFileChange,
	onRemoveBookFile,
	errorMessage,
}: FirstStepProps) => {
	return (
		<>
			{!bookFile && (
				<DragAndDropZone
					label="PDF file"
					handleFileChange={onBookFileChange}
					fileRef={bookFileRef}
					errorMessage={errorMessage}
				/>
			)}
			{bookFile && (
				<Badge
					label="PDF file"
					file={bookFile}
					onRemoveFile={onRemoveBookFile}
				/>
			)}
		</>
	);
};
