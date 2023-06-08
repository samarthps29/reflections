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
					fullScreen ? "w-0" : "w-0 sm:w-1/4"
				}`}
			>
				<div className="w-4/5">
					<p className="text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-[#537EC5] sm:text-3xl/[30px] lg:text-5xl/[50px]">
						Make Every Moment Matter.
					</p>
				</div>
			</div>
			<div
				className={`relative flex h-screen ${
					fullScreen ? "w-full" : "w-full sm:w-3/4"
				} ${styles.bgi4} items-center justify-center`}
			>
				<div className="absolute left-0 top-0 h-full w-full border-l-4 border-stone-900"></div>
				<Navigator setFullScreen={setFullScreen} />

				<div className="flex h-5/6 w-11/12 items-center justify-center rounded-2xl bg-stone-400 bg-opacity-0 text-center font-inter text-5xl/[46px] font-bold tracking-tighter text-white ">
					<TodoCard />
				</div>
			</div>
		</div>
	);
};
export default TodoPage;
