import { Loader } from "@/_views/upload/components/loader/Loader";
import React, { useRef } from "react";

type CardProps = {
	name: string;
	fontFamilyClassName: string;
	isChecked: boolean;
	isUpdating: boolean;
	onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Card = ({
	name,
	fontFamilyClassName,
	isChecked,
	isUpdating,
	onOptionChange,
}: CardProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (!inputRef.current) return;
		inputRef.current.click();
	};
	return (
		<div
			onClick={handleClick}
			className="hover:cursor-pointer relative border border-white dark:border-black border-b rounded-none border-b-layoutDark dark:border-b-layoutLight px-4 py-2  w-full h-32 flex flex-col gap-4 hover:border hover:border-black hover:rounded-xl"
		>
			<p className={fontFamilyClassName}>{name}</p>
			<h5 className={`${fontFamilyClassName} text-xl`}>
				The most beautiful things in the world cannot be seen or touched, they
				are felt with the heart.
			</h5>
			{!isUpdating && (
				<input
					ref={inputRef}
					className="absolute top-5 right-5"
					type="radio"
					name="font-family"
					value={name}
					checked={isChecked}
					onChange={onOptionChange}
				/>
			)}
			{isUpdating && (
				<div className="absolute top-5 right-5">
					<Loader />
				</div>
			)}
		</div>
	);
};
