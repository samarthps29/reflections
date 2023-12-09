import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../api/userServices";

const UserSignupPage = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const userNameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [buttonText, setButtonText] = useState("Sign up");
	const navigate = useNavigate();
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-[#1c1c1c]">
			<div className="fixed -top-20 left-20 z-0 rotate-180 -scale-x-100 font-inter text-[150px] font-bold tracking-widest text-[#f1f1f1]">
				reflections
			</div>
			<div className="fixed -bottom-20 right-20 z-0 font-inter text-[150px] font-bold tracking-widest text-[#f1f1f1]">
				reflections
			</div>
			<div className="z-10 flex w-3/5 flex-col items-center justify-center sm:w-1/2 md:w-[45%] lg:w-1/4">
				<form
					onSubmit={(e) => {
						setButtonText("Loading...");
						e.preventDefault();
						userServices
							.post("/new", {
								name: nameRef.current?.value,
								email: emailRef.current?.value,
								userName: userNameRef.current?.value,
								password: passwordRef.current?.value,
							})
							.then(() => {
								// console.log("User Created Succesfully");
								setButtonText("Sign up");
								navigate("/login");
							})
							.catch(() => {
								// console.log(err);
								setButtonText("Sign up");
							});
					}}
				>
					<div className="mb-8 text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
						Create a New Account
					</div>
					<input
						type="text"
						className="text-md mb-2 w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Name"
						autoComplete="off"
						ref={nameRef}
						required
						spellCheck={false}
					/>

					<input
						type="text"
						className="text-md mb-2 w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Email"
						autoComplete="off"
						ref={emailRef}
						required
						spellCheck={false}
					/>
					<input
						type="text"
						className="text-md mb-2 w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Username"
						autoComplete="username"
						ref={userNameRef}
						required
						spellCheck={false}
					/>
					<input
						type="password"
						className="text-md w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Password"
						autoComplete="current-password"
						ref={passwordRef}
						required
						spellCheck={false}
					/>
					<button
						className="mt-6 w-full rounded-md bg-[#61a7ec] px-3 py-2 font-serif font-bold text-black"
						type="submit"
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};
export default UserSignupPage;
