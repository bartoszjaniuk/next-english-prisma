import React from "react";
import { UseFormRegister } from "react-hook-form";
import { UploadFileFormFieldValues } from "../../models/UploadFileForm.types";
import { Badge } from "../badge/Badge";
import { UploadFileForm } from "./components/UploadFileForm";

type SecondStepProps = {
	bookFile: File | undefined;
	handleRemoveBookFile: () => void;
	register: UseFormRegister<UploadFileFormFieldValues>;
	onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	imageFile: File | undefined;
	imageFileRef: React.MutableRefObject<HTMLInputElement | null>;
	previewUrl: any;
	imageFileErrorMessage?: string;
};

export const SecondStep = ({
	bookFile,
	handleRemoveBookFile,
	imageFile,
	imageFileRef,
	onImageChange,
	previewUrl,
	register,
	imageFileErrorMessage,
}: SecondStepProps) => {
	return (
		<>
			{bookFile && (
				<>
					<Badge
						label="PDF file"
						file={bookFile}
						onRemoveFile={handleRemoveBookFile}
					/>
					<UploadFileForm
						imageFileErrorMessage={imageFileErrorMessage}
						register={register}
						handleImageChange={onImageChange}
						imageFile={imageFile}
						imageFileRef={imageFileRef}
						previewUrl={previewUrl}
					/>
				</>
			)}
		</>
	);
};
