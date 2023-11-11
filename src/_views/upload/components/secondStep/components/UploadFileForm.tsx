"use client";
import { UploadFileFormFieldValues } from "@/_views/upload/models/UploadFileForm.types";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { DragAndDropZone } from "../../dragAndDropZone/DragAndDropZone";
import { ImagePreview } from "./components/ImagePreview";

type UploadFileFormProps = {
	register: UseFormRegister<UploadFileFormFieldValues>;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	imageFile: File | undefined;
	imageFileRef: React.MutableRefObject<HTMLInputElement | null>;
	previewUrl: any;
	imageFileErrorMessage?: string;
};

export const UploadFileForm = ({
	register,
	handleImageChange,
	imageFile,
	imageFileRef,
	previewUrl,
	imageFileErrorMessage,
}: UploadFileFormProps) => {
	return (
		<form className="w-full">
			<div className="mb-6  w-full">
				<label
					htmlFor="bookName"
					className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
				>
					Nazwa pliku*
				</label>
				<input
					{...register("bookName")}
					type="text"
					id="bookName"
					className="bg-layoutLight border border-gray-200 text-gray-900 text-sm font-medium rounded-md block w-full p-4 dark:text-layoutLight dark:bg-layoutDark dark:border-gray-700"
				/>
			</div>
			{!imageFile && (
				<DragAndDropZone
					fileRef={imageFileRef}
					handleFileChange={handleImageChange}
					label="Okładka"
					isPDFFormat={false}
					errorMessage={imageFileErrorMessage}
				/>
			)}
			{imageFile && previewUrl && (
				<ImagePreview
					previewUrl={previewUrl as string}
					label="Podgląd obrazka"
				/>
			)}
		</form>
	);
};
