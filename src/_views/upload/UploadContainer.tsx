"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from "./hooks/useStepper";
import { UploadFileFormFieldValues } from "./models/UploadFileForm.types";
import { schema } from "./constants/schema.consts";
import { useFile } from "./hooks/useFile";
import { useUploadFile } from "./hooks/useUploadFile";
import { stepTitle } from "./constants/flowSteps.consts";
import { FormStepper } from "./components/formStepper/FormStepper";
import { FirstStep } from "./components/firstStep/FirstStep";
import { SecondStep } from "./components/secondStep/SecondStep";
import { StepButtons } from "./components/stepButtons/StepButtons";
import { ThirdStep } from "./components/thirdStep/ThirdStep";
import { checkIfButtonIsDisabled } from "./utils/checkIfButtonIsDisabled";
import { Loader } from "./components/loader/Loader";

export const UploadContainer = () => {
	const { step, nextStep, prevStep, resetStep } = useStepper();

	const {
		bookFile,
		bookFileErrorMessage,
		bookFileRef,
		cloudinaryImageUrl,
		handleBookFileChange,
		handleRemoveBookFile,
		handleUploadFile,
		uploadBook,
		isLoading,
	} = useUploadFile({ nextStep, resetStep });
	const {
		register,
		getValues,
		formState: { isValid },
	} = useForm<UploadFileFormFieldValues>({
		resolver: zodResolver(schema),
		reValidateMode: "onSubmit",
		mode: "all",
	});

	const {
		handleFileChange: handleImageChange,
		file: imageFile,
		fileRef: imageFileRef,
		previewUrl,
		imageFileErrorMessage,
	} = useFile();

	const handleFirstStep = () => {
		if (!imageFile) return;
		handleUploadFile({ image: imageFile });
	};

	const handleSecondStep = async () => {
		if (!bookFile) return;
		await uploadBook(bookFile, getValues("bookName"));
	};

	return (
		<div className="w-full lg:w-3/4 xl:w-1/2 flex flex-col items-center">
			<Loader isLoading={isLoading} />
			{!isLoading && (
				<>
					<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary self-start mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
						{stepTitle[step]}
					</h1>
					<FormStepper step={step} />
					{step === 0 && (
						<FirstStep
							bookFile={bookFile}
							bookFileRef={bookFileRef}
							onBookFileChange={handleBookFileChange}
							onRemoveBookFile={handleRemoveBookFile}
							errorMessage={bookFileErrorMessage}
						/>
					)}
					{step === 1 && (
						<SecondStep
							imageFileErrorMessage={imageFileErrorMessage}
							bookFile={bookFile}
							imageFile={imageFile}
							imageFileRef={imageFileRef}
							previewUrl={previewUrl}
							register={register}
							handleRemoveBookFile={handleRemoveBookFile}
							onImageChange={handleImageChange}
						/>
					)}
					{step == 2 && (
						<ThirdStep
							bookName={getValues("bookName")}
							bookFile={bookFile}
							cloudinaryImageUrl={cloudinaryImageUrl}
							onRemoveBookFile={handleRemoveBookFile}
						/>
					)}
					<StepButtons
						isNextDisabled={checkIfButtonIsDisabled({
							bookFile,
							isValid,
							step,
						})}
						step={step}
						nextStep={nextStep}
						previousStep={prevStep}
						onFirstStep={handleFirstStep}
						onSecondStep={handleSecondStep}
					/>
				</>
			)}
		</div>
	);
};
