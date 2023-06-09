import { useState } from "react";
import styles from "../styles/background.module.css";
import Navigator from "./Navigator";
import TodoCard from "./TodoCard";

const TodoPage = () => {
	const [fullScreen, setFullScreen] = useState(true);
	return (
		<div className={`flex items-center bg-[#161616]`}>
			<div
				className={`flex w-0 flex-col items-center ${
					fullScreen ? "" : "w-0 sm:w-1/4"
				}`}
			>
				<div className="w-4/5">
					<p
						className={`text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-[#537EC5] opacity-0 sm:text-3xl/[30px] lg:text-5xl/[50px] ${
							fullScreen ? "" : "opacity-100"
						}`}
					>
						Make Every Moment Matter.
					</p>
				</div>
			</div>
			<div
				className={`flex h-screen w-full ${
					fullScreen ? "" : "w-full sm:w-3/4"
				} ${styles.bgi4} items-center justify-center`}
			>
				<div className="relative flex h-full w-full items-center justify-center rounded-2xl p-10 text-center font-inter text-5xl/[46px] font-bold tracking-tighter text-white ">
					<Navigator setFullScreen={setFullScreen} />
					<TodoCard />
				</div>
			</div>
		</div>
	);
};
export default TodoPage;
