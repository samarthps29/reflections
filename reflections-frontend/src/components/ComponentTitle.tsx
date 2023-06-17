const ComponentTitle = ({ title }: { title: string }) => {
	return (
		<div
			className={`flex items-center justify-center rounded-md px-2 font-bold tracking-normal text-white md:text-lg`}
		>
			{title}
		</div>
	);
};

export default ComponentTitle;
