type ToggleManagerProps = {
	onClick: () => void;
	isSaving: boolean;
};

const ToggleManager = ({ onClick, isSaving }: ToggleManagerProps) => {
	return (
		<button
			disabled={isSaving}
			onClick={() => {
				onClick();
			}}
		>
			<div
				className={`flex items-center justify-center rounded-md px-2 font-bold      md:text-lg ${
					isSaving ? "text-[#79c6ff]" : "text-white"
				}`}
			>
				{isSaving ? "Wait" : "Save"}
			</div>
		</button>
	);
};

export default ToggleManager;
