type ToggleManagerProps = {
	onClick: () => void;
};

const ToggleManager = ({ onClick }: ToggleManagerProps) => {
	return (
		<button
			className=""
			onClick={() => {
				onClick();
			}}
		>
			<div
				className={`flex items-center justify-center rounded-md px-2 text-xs font-bold text-white sm:text-sm md:text-lg`}
			>
				Save
			</div>
		</button>
	);
};

export default ToggleManager;
