const ComponentTitle = ({ title }: { title: string }) => {
	return (
		// #F7EFE5
		<div
			className={`absolute left-1 flex items-center justify-center rounded-md px-2  text-xs font-bold tracking-normal text-[#ECF2FF] sm:text-sm md:text-lg`}
		>
			{title}
		</div>
	);
};

export default ComponentTitle;
