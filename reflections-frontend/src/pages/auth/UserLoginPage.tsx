import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userServices from "../../api/userServices";
import { usernameRegex, emailRegex } from "../../utility/utility";

const UserLoginPage = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState(false);
	const [buttonText, setButtonText] = useState("Sign in");
	const navigate = useNavigate();

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-[#1c1c1c]">
			<div className="fixed -top-20 left-20 z-0 rotate-180 -scale-x-100 font-inter text-[150px] font-bold tracking-widest text-[#f1f1f1]">
				reflections
			</div>
			<div className="fixed -bottom-20 right-20 z-0 font-inter text-[150px] font-bold tracking-widest text-[#f1f1f1]">
				reflections
			</div>

			<div className="z-10 flex w-3/4 flex-col items-center justify-center sm:w-1/2 md:w-[45%] lg:w-1/4">
				<form
					name="loginform"
					onSubmit={(e) => {
						e.preventDefault();
						let body: any = {};
						const test1 = emailRegex.test(emailRef.current!.value),
							test2 = usernameRegex.test(emailRef.current!.value);
						if (test1 || test2) {
							if (test1) {
								body["email"] = emailRef.current!.value;
							} else {
								body["userName"] = emailRef.current!.value;
							}
							setButtonText("Loading...");
							userServices
								.post("/login", {
									...body,
									password: passwordRef.current?.value,
								})
								.then((res) => {
									setButtonText("Sign in");
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
								.catch((err) => {
									console.log(err.response.data.message);
									setButtonText("Sign in");
									setError(true);
								});
						} else {
							setError(true);
						}
					}}
				>
					<div className="mb-8 w-full justify-center text-center font-serif text-2xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
						Sign in to your Account
					</div>
					<input
						type="text"
						className="text-md mb-2 w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Username"
						autoComplete="username"
						ref={emailRef}
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
						// #42a6e0
						className={`text-md mt-6 w-full rounded-md ${
							!error
								? "bg-[#61a7ec] text-black"
								: "bg-[#89375f] text-white"
						} px-3 py-2 font-serif font-bold `}
						type="submit"
						disabled={buttonText !== "Sign in"}
					>
						{buttonText}
					</button>

					<div className="mt-1 flex w-full justify-end">
						<Link
							className="font-serif text-xs text-[#e9e9e9]"
							to="/resetPassword"
						>
							Forgot Password
						</Link>
						{/* <Link
							className="font-serif text-xs text-[#e9e9e9]"
							to="/changePassword"
						>
							Change Password
						</Link> */}
					</div>

					<div className="w-full text-center">
						<p className="mt-5 font-serif text-sm font-semibold text-[#e9e9e9]">
							Don't have an account yet,{" "}
							<Link className="font-bold text-white" to="/signup">
								sign up.
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};
export default UserLoginPage;
