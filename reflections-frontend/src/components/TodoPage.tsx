import { useState } from "react";
import styles from "../styles/background.module.css";
import Navigator from "./Navigator";
import TodoCard from "./TodoCard";

const TodoPage = () => {
	const [fullScreen, setFullScreen] = useState(true);
	return (
		<div className={`flex items-center bg-[#161616]`}>
			<div
				className={`flex flex-col items-center ${
					fullScreen ? "w-0" : "w-0 sm:w-1/3"
				}`}
			>
				<div className="w-4/5">
					<p className="text-center font-inter text-4xl/[40px] font-extrabold tracking-tighter text-[#537EC5] md:text-5xl/[50px] lg:text-6xl/[60px]">
						Make Every Moment Matter.
					</p>
				</div>
			</div>
			<div
				className={`relative flex h-screen ${
					fullScreen ? "w-full" : "w-full sm:w-2/3"
				} ${styles.bgi4} items-center justify-center`}
			>
				<div className="absolute left-0 top-0 h-full w-full border-l-4 border-stone-900"></div>
				<Navigator setFullScreen={setFullScreen} />

				<div className="flex h-4/5 w-3/4 items-center justify-center rounded-2xl bg-stone-400 bg-opacity-0 text-center font-inter text-5xl/[46px] font-bold tracking-tighter text-white ">
					<TodoCard />
				</div>
			</div>
		</div>
	);
};
export default TodoPage;
