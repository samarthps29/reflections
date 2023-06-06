import Navigator from "./Navigator";
import TodoUpdated from "./TodoCard";
import styles from "../styles/background.module.css";

const TodoPage = () => {
	return (
		<div className={` flex items-center bg-[#161616]`}>
			<div className=" flex w-1/3 flex-col items-center">
				<div className="w-4/5">
					<p className="text-center font-inter text-4xl/[40px] font-extrabold tracking-tighter text-[#537EC5] md:text-5xl/[50px] lg:text-6xl/[60px]">
						{/* Be the Hero of Your Day. */}
						{/* Transform Tasks into Triumphs. */}
						Make Every Moment Matter.
					</p>
				</div>
			</div>
			<div
				className={`relative flex h-screen w-2/3 ${styles.bgi4} items-center justify-center`}
			>
				<div className="absolute left-0 top-0 h-full w-full border-l-4 border-stone-900"></div>
				<Navigator />

				<div className="overflow-x-none flex h-3/4 w-2/3 items-center justify-center rounded-lg bg-stone-400 bg-opacity-20 text-center font-inter text-5xl/[46px] font-bold tracking-tighter text-white ">
					<TodoUpdated />
				</div>
			</div>
		</div>
	);
};
export default TodoPage;
