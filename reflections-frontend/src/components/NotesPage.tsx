import NotesCard from "./NotesCard";

const NotesPage = () => {
	// blue bg color -> #8EA7E9
	// black font color -> black
	// #181823
	return (
		<div className={`flex items-center bg-[#161616]`}>
			<div className="flex w-0 flex-col items-center ">
				<div className="w-4/5">
					<p className="text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-[#537EC5] sm:text-4xl/[40px] lg:text-5xl/[50px]">
						Journey through the Realm of Notes.
					</p>
				</div>
			</div>
			<div
				className={`flex h-screen w-full items-center justify-center bg-[#6B728E]`}
			>
				<div className="relative z-10 flex h-full w-full items-center justify-center rounded-md p-1">
					<NotesCard />
				</div>
			</div>
		</div>
	);
};
export default NotesPage;
