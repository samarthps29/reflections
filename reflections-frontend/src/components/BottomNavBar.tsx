type BottomNavBarProps = {
	sideBarText: string;
	clearText: string;
	newText: string;
	deleteText: string;
	readingModeText: string;
	saveStatusText: string;
	saveTimeText: string;
	sideBarFunction: () => void;
	clearFunction: () => void;
	newFunction: () => void;
	deleteFunction: () => void;
	readingModeFunction: () => void;
	saveStatusFunction: () => void;
	enableDelete: boolean;
	enableSave: boolean;
	enableReadingMode: boolean;
};

const BottomNavBar = ({
	sideBarText,
	clearText,
	newText,
	deleteText,
	readingModeText,
	saveStatusText,
	saveTimeText,
	sideBarFunction,
	clearFunction,
	newFunction,
	deleteFunction,
	readingModeFunction,
	saveStatusFunction,
	enableSave,
	enableDelete,
	enableReadingMode,
}: BottomNavBarProps) => {
	return (
		<div className="fixed bottom-0 flex w-full justify-between bg-[#3c3e41] px-1 py-[1.5px]">
			{/* why do we require flex here?? */}
			<div className="left-0 flex">
				<button
					className="mr-4 font-inter text-xs tracking-wider text-white"
					onClick={sideBarFunction}
				>
					{sideBarText}
				</button>
				<button
					className="mr-4 font-inter text-xs tracking-wider text-white"
					onClick={clearFunction}
				>
					{clearText}
				</button>
				<button
					className="mr-4 font-inter text-xs tracking-wider text-white"
					onClick={newFunction}
				>
					{newText}
				</button>
				<button
					className="font-inter text-xs tracking-wider text-white"
					onClick={deleteFunction}
					disabled={enableDelete}
				>
					{deleteText}
				</button>
			</div>

			<div className="right-0 flex">
				<button
					className="mr-4 font-inter text-xs tracking-wider text-white"
					onClick={readingModeFunction}
					disabled={enableReadingMode}
				>
					{readingModeText}
				</button>
				<button
					className="mr-4 font-inter text-xs tracking-wider text-white"
					onClick={saveStatusFunction}
					disabled={enableSave}
				>
					{saveStatusText}
				</button>
				<p className="font-inter text-xs tracking-wider text-white">
					Last saved: {saveTimeText}
				</p>
			</div>
		</div>
	);
};

export default BottomNavBar;
