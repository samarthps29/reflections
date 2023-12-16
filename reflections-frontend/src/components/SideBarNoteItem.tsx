type SideBarNoteItemProps = {
	bgColor?: string;
	textA: string;
	textB?: number;
	textC?: string;
	keyVal: string;
	onClick: () => void;
};

const SideBarNoteItem = ({
	bgColor,
	textA,
	textB,
	textC,
	keyVal,
	onClick,
}: SideBarNoteItemProps) => {
	return (
		<div
			key={keyVal}
			className={`mb-3 w-full items-start justify-center rounded-lg ${bgColor} px-2 py-2 hover:bg-[#4b4b4b]`}
			onClick={onClick}
		>
			<div className="flex justify-between ">
				<p className="text-[#e5e2e2]">{textA}</p>
				{textB && <p className="text-[#bcbcbc]">#{textB}</p>}
			</div>
			{textC && (
				<p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[#bcbcbc]">
					{textC}
				</p>
			)}
		</div>
	);
};

export default SideBarNoteItem;
