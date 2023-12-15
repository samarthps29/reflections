import { useLocation } from "react-router-dom";

const MessagePage = () => {
	const location = useLocation();
	const message = location.state.message;
	const secondaryMessage = location.state.secondaryMessage;
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-[#1c1c1c]">
			<div className="fixed -top-20 left-20 z-0 rotate-180 -scale-x-100 font-inter text-[150px] font-bold tracking-widest text-[#f1f1f1]">
				reflections
			</div>
			<div className="fixed -bottom-20 right-20 z-0 font-inter text-[150px] font-bold tracking-widest text-[#f1f1f1]">
				reflections
			</div>

			<div className="z-10 flex w-4/5 flex-col items-center justify-center">
				<div className="text-md flex h-full w-full items-center justify-center text-center font-serif font-semibold text-white sm:text-xl">
					{message}
				</div>
				{secondaryMessage && (
					<div className="mt-1 flex h-full w-full items-center justify-center text-center font-serif text-sm font-medium text-[#f1f1f1] sm:text-lg">
						{secondaryMessage}
					</div>
				)}
			</div>
		</div>
	);
};
export default MessagePage;
