import styles from "../styles/background.module.css";
import TodoCard from "./TodoCard";

const TodoPage = () => {
	return (
		<div className={`flex items-center bg-[#161616]`}>
			<div className={` flex w-0 flex-col items-center`}>
				<div className="w-4/5">
					<p
						className={`text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-[#537EC5] opacity-0 sm:text-3xl/[30px] lg:text-5xl/[50px]`}
					>
						Make Every Moment Matter.
					</p>
				</div>
			</div>
			<div
				className={`flex h-screen w-full ${styles.bgi4} items-center justify-center`}
			>
				<div className="relative flex h-full w-full items-center justify-center rounded-2xl p-10 text-center font-inter text-5xl/[46px] font-bold tracking-tighter text-white ">
					<TodoCard />
				</div>
			</div>
		</div>
	);
};
export default TodoPage;
