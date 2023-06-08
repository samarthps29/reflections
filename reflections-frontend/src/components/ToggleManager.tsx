type ToggleManagerProps = {
	status: boolean;
	setStatus: React.Dispatch<React.SetStateAction<boolean>>;
	onClick: () => void;
};

const ToggleManager = ({ status, setStatus, onClick }: ToggleManagerProps) => {
	return (
		<button
			className="absolute right-1"
			onClick={() => {
				setStatus((prevStatus) => !prevStatus);
				onClick();
			}}
		>
			<div
				className={`flex items-center justify-center rounded-md px-2 text-xs font-bold text-[#ECF2FF] sm:text-sm md:text-lg`}
			>
				{status ? "Edit" : "Save"}
			</div>
		</button>
	);
};

export default ToggleManager;
