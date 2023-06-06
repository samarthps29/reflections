type ToggleManagerProps = {
	status: boolean;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
	onClick: () => void;
};

const ToggleManager = ({ status, setStatus, onClick }: ToggleManagerProps) => {
	return (
		<button
			className="absolute right-2"
			onClick={() => {
				setStatus((prevStatus) => !prevStatus);
				onClick();
			}}
		>
			<div
				className={`flex items-center justify-center rounded-md px-2 text-sm font-bold text-[#ECF2FF] md:text-lg`}
			>
				{status ? "Locked" : "Unlocked"}
			</div>
		</button>
	);
};

export default ToggleManager;
