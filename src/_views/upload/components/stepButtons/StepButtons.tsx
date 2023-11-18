"use client";

import { buttonTitle } from "../../constants/flowSteps.consts";
import { Button } from "./components/Button";

type StepButtonsProps = {
	step: number;
	nextStep: () => void;
	previousStep: () => void;
	onFirstStep: () => void;
	onSecondStep: () => void;
	isNextDisabled: boolean;
};

export const StepButtons = ({
	step,
	nextStep,
	previousStep,
	isNextDisabled,
	onFirstStep,
	onSecondStep,
}: StepButtonsProps) => {
	const isFirstStep = step < 1;

	const handleClick = () => {
		if (step === 1) {
			return onFirstStep();
		}
		if (step === 2) return onSecondStep();
		nextStep();
	};

	return (
		<div className="flex self-start pt-4">
			{!isFirstStep && (
				<Button title="Previous step" onClick={previousStep} isInverted />
			)}
			<Button
				title={buttonTitle[step]}
				isDisabled={isNextDisabled}
				onClick={handleClick}
			/>
		</div>
	);
};
