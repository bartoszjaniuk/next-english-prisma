import ReactDOM from "react-dom";
import { usePopperTooltip } from "react-popper-tooltip";
import { Loader } from "@/_views/upload/components/loader/Loader";
import { PropsWithChildren } from "react";

export type CustomTooltipProps = {
	text: string;
	isTranslationLoading: boolean;
	translation: string | undefined;
	onClick: () => void;
} & PropsWithChildren;

export const CustomTooltip = ({
	children,
	onClick,
	isTranslationLoading,
	translation,
	text,
}: CustomTooltipProps) => {
	const {
		getArrowProps,
		getTooltipProps,
		setTooltipRef,
		setTriggerRef,
		visible,
	} = usePopperTooltip({
		closeOnOutsideClick: true,
		trigger: "click",
		interactive: true,
	});

	return (
		<>
			<div
				className="border-transparent hover:border-primary inline"
				onClick={onClick}
				role="button"
				ref={setTriggerRef}
			>
				{children}
			</div>
			{visible &&
				ReactDOM.createPortal(
					<div
						ref={setTooltipRef}
						{...getTooltipProps({ className: "tooltip-container" })}
					>
						{isTranslationLoading && <Loader />}
						{!isTranslationLoading && translation && (
							<div className="flex gap-2">{translation}</div>
						)}
						<div {...getArrowProps({ className: "tooltip-arrow" })} />
					</div>,
					document.body,
				)}
		</>
	);
};
