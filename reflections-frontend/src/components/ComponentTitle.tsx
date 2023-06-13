const ComponentTitle = ({ title }: { title: string }) => {
	return (
		// #F7EFE5
		<div
			className={`flex items-center justify-center rounded-md px-2 text-xs font-bold tracking-normal text-white sm:text-sm md:text-lg`}
		>
			{title}
		</div>
	);
};

export default ComponentTitle;
