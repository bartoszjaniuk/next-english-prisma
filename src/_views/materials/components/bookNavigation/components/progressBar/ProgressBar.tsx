export const ProgressBar = ({
	progressPercentage,
}: {
	progressPercentage: number;
}) => {
	const getProgressPercengateWithMinimalNumber = (currentProgress: number) => {
		if (currentProgress < 10) return 10;
		return currentProgress;
	};

	return (
		<div className="w-full lg:w-[700px]">
			<div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg ">
				<div
					style={{
						width: `${getProgressPercengateWithMinimalNumber(
							progressPercentage,
						)}%`,
					}}
					className={`bg-primary h-10 leading-none rounded-lg`}
				>
					<p className="text-md font-medium text-blue-100 px-2 h-full flex items-center">
						{progressPercentage}%
					</p>
				</div>
			</div>
		</div>
	);
};
