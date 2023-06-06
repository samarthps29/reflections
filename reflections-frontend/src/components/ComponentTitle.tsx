const ComponentTitle = ({ title }: { title: string }) => {
	return (
		// #F7EFE5
		<div
			className={`absolute left-1 flex items-center justify-center rounded-md px-2  text-sm font-bold tracking-normal text-[#ECF2FF] md:text-lg`}
		>
			{title}
		</div>
	);
};

export default ComponentTitle;
