type SideBarNoteItemProps = {
	bgColor?: string;
	textA: string;
	textB: number;
	lastEditTime: string;
	key: string;
	onClick: () => void;
};

const SideBarNoteItem = ({
	bgColor,
	textA,
	textB,
	lastEditTime,
	key,
	onClick,
}: SideBarNoteItemProps) => {
	return (
		<div
			className={`mb-3 w-full items-start justify-center rounded-lg ${bgColor} px-2 py-2 hover:bg-[#4b4b4b]`}
			key={key}
			onClick={onClick}
		>
			<div className="flex justify-between ">
				<p className="text-[#e5e2e2]">{textA}</p>
				<p className="text-[#bcbcbc]">#{textB}</p>
			</div>
			<p className="text-[#bcbcbc]">Last Edited : {lastEditTime}</p>
		</div>
	);
};

export default SideBarNoteItem;
