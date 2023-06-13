import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/background.module.css";
import userServices from "../api/userServices";

const UserLoginPage = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	return (
		<div className={`flex items-center bg-[#0F0E0E]`}>
			<div className="flex w-full flex-col items-center pr-2 sm:w-1/3">
				<div className="w-2/3">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							userServices
								.post("/login", {
									userName: emailRef.current?.value,
									password: passwordRef.current?.value,
								})
								.then((res) => {
									if (res.data.accessToken) {
										localStorage.setItem(
											"accessToken",
											res.data.accessToken
										);
										localStorage.setItem(
											"userName",
											emailRef.current!.value
										);
										navigate("/");
									}
								})
								.catch((err) => console.log(err));
						}}
					>
						<div
							className={`flex flex-col items-center gap-2 bg-transparent`}
						>
							<span className="text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
								Sign in to your account
							</span>
							<input
								type="text"
								className="text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-7 font-serif text-[#f0f8ff] focus:outline-none"
								placeholder="Username"
								autoComplete="username"
								ref={emailRef}
								required
								spellCheck={false}
							/>
							<input
								type="password"
								className="text-md w-full border-b-2 border-[#a4b8ce] border-opacity-30 bg-transparent pt-5 font-serif text-[#f0f8ff] focus:bg-transparent focus:outline-none"
								placeholder="Password"
								autoComplete="current-password"
								ref={passwordRef}
								required
								spellCheck={false}
							/>
							<button
								// #42a6e0
								className="text-md mt-9 w-full rounded-md bg-[#89375F] px-3 py-2 font-serif font-bold text-white"
								type="submit"
							>
								Sign in
							</button>
							<div className="w-full text-center">
								<p className="mt-5 font-inter text-sm font-semibold text-white">
									Don't have an account yet,{" "}
									<Link
										className="font-bold text-white underline decoration-white decoration-solid"
										to="/signup"
									>
										sign up.
									</Link>
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div
				className={`relative flex h-screen w-0 overflow-hidden sm:w-2/3 ${styles.bgi1} items-center justify-center`}
			>
				<div className="absolute left-0 top-0 h-full w-full border-l-4 border-black border-opacity-90" />
				<div className="flex h-1/3 w-2/3 items-center justify-center rounded-xl bg-stone-900 bg-opacity-60 text-center font-inter text-3xl/[30px] font-extrabold tracking-tighter text-white backdrop-blur-2xl md:text-4xl/[40px] xl:text-5xl/[50px]">
					<p className="px-5">
						Minimalist Magic: Streamline Your Notes and Diary with
						Ease
					</p>
				</div>
			</div>
		</div>
	);
};
export default UserLoginPage;
