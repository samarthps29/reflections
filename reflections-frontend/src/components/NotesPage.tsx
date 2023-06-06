import styles from "../styles/background.module.css";
import Navigator from "./Navigator";
import NotesCard from "./NotesCard";

const NotesPage = () => {
	// blue bg color -> #8EA7E9
	// black font color -> black
	// #181823
	return (
		<div className={`flex items-center bg-[#161616]`}>
			<div className="flex w-1/3 flex-col items-center">
				<div className="w-4/5">
					<p className="text-center font-inter text-4xl/[40px] font-extrabold tracking-tighter text-[#537EC5] md:text-5xl/[50px] lg:text-6xl/[60px]">
						Journey through the Realm of Notes.
					</p>
				</div>
			</div>
			<div
				className={`relative flex h-screen w-2/3 ${styles.bgi3} items-center justify-center`}
			>
				<div className="absolute left-0 top-0 h-full w-full border-l-4 border-stone-900"></div>
				<Navigator />
				<div className="overflow-x-none flex h-3/4 w-2/3 items-center justify-center rounded-2xl bg-transparent">
					<NotesCard />
				</div>
			</div>
		</div>
	);
};
export default NotesPage;
