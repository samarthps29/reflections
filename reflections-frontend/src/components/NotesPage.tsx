import NotesCard from "./NotesCard";

const NotesPage = () => {
	// #6B728E
	return (
		<div className={`flex items-center bg-[#161616]`}>
			<div
				className={`flex h-screen w-full items-center justify-center`}
			>
				<div className="relative z-10 flex h-full w-full items-center justify-center">
					<NotesCard />
				</div>
			</div>
		</div>
	);
};
export default NotesPage;
