// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../styles/background.module.css";
// import userServices from "../api/userServices";

// const UserSignupPage = () => {
// 	const nameRef = useRef<HTMLInputElement>(null);
// 	const emailRef = useRef<HTMLInputElement>(null);
// 	const userNameRef = useRef<HTMLInputElement>(null);
// 	const passwordRef = useRef<HTMLInputElement>(null);
// 	const navigate = useNavigate();
// 	return (
// 		<div className={`flex items-center bg-[#1d1d1d]`}>
// 			<div className="flex w-full flex-col items-center pr-2 sm:w-1/3">
// 				<div className="w-2/3">
// 					<form
// 						onSubmit={(e) => {
// 							e.preventDefault();
// 							userServices
// 								.post("/new", {
// 									name: nameRef.current?.value,
// 									email: emailRef.current?.value,
// 									userName: userNameRef.current?.value,
// 									password: passwordRef.current?.value,
// 								})
// 								.then(() => {
// 									console.log("User Created Succesfully");
// 									navigate("/login");
// 								})
// 								.catch((err) => console.log(err));
// 						}}
// 					>
// 						<div
// 							className={`flex flex-col items-center gap-2 bg-transparent`}
// 						>
// 							<span className="text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
// 								Create a new account
// 							</span>
// 							<input
// 								type="text"
// 								className="text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-7 font-serif text-[#f0f8ff] focus:outline-none"
// 								placeholder="Name"
// 								autoComplete="off"
// 								ref={nameRef}
// 								required
// 								spellCheck={false}
// 							/>

// 							<input
// 								type="text"
// 								className="text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-6 font-serif text-[#f0f8ff] focus:outline-none"
// 								placeholder="Email"
// 								autoComplete="off"
// 								ref={emailRef}
// 								required
// 								spellCheck={false}
// 							/>
// 							<input
// 								type="text"
// 								className="text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-7 font-serif text-[#f0f8ff] focus:outline-none"
// 								placeholder="Username"
// 								autoComplete="username"
// 								ref={userNameRef}
// 								required
// 								spellCheck={false}
// 							/>
// 							<input
// 								type="password"
// 								className="text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-5 font-serif text-[#f0f8ff] focus:bg-transparent focus:outline-none"
// 								placeholder="Password"
// 								autoComplete="current-password"
// 								ref={passwordRef}
// 								required
// 								spellCheck={false}
// 							/>
// 							<button
// 								className="mt-9 w-full rounded-md bg-[#61a7ec] px-3 py-2 font-serif font-bold text-black"
// 								type="submit"
// 							>
// 								Sign up
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 			<div
// 				className={`relative flex h-screen w-0 overflow-hidden sm:w-2/3 ${styles.bgi2} items-center justify-center`}
// 			>
// 				<div className="flex h-1/3 w-1/2 items-center justify-center rounded-xl bg-stone-900 bg-opacity-50 text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-white backdrop-blur-2xl md:text-4xl/[40px] xl:text-5xl/[50px] ">
// 					<p className="px-5">
// 						Simplicity Redefined:
// 						<br /> Embrace the Beauty of Minimalist Notes
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default UserSignupPage;
