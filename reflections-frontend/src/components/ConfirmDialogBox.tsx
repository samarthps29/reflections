type ComfirmDialogBoxProps = {
	message: string;
	textBtnA: string;
	textBtnB: string;
	functionA: () => void;
	functionB: () => void;
};

const ConfirmDialogBox = ({
	message,
	textBtnA,
	textBtnB,
	functionA,
	functionB,
}: ComfirmDialogBoxProps) => {
	return (
		<div className="text-md fixed bottom-10 right-4 flex flex-col justify-center gap-3 rounded-lg bg-[#444444] px-4 py-3 font-semibold text-[#e3e3e3]">
			{message}
			<div className="flex justify-end gap-2 font-semibold">
				<button
					className="rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#FF6969] hover:text-black"
					onClick={functionA}
				>
					{textBtnA}
				</button>
				<button
					className="rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#8de86b] hover:text-black"
					onClick={functionB}
				>
					{textBtnB}
				</button>
			</div>
		</div>
	);
};

export default ConfirmDialogBox;
