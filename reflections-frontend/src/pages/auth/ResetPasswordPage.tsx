import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../api/userServices";

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ResetPasswordPage = () => {
	const userNameRef = useRef<HTMLInputElement>(null);
	const [buttonText, setButtonText] = useState("Send email");
	const [error, setError] = useState(false);
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
					name="resetpasswordform"
					onSubmit={(e) => {
						e.preventDefault();
						let body: any = {};
						const test1 = emailRegex.test(
								userNameRef.current!.value
							),
							test2 = usernameRegex.test(
								userNameRef.current!.value
							);
						if (test1 || test2) {
							if (test1) {
								body["email"] = userNameRef.current!.value;
							} else {
								body["userName"] = userNameRef.current!.value;
							}
							setButtonText("Loading...");
							userServices
								.put("/resetPassword", {
									...body,
								})
								.then(() => {
									setButtonText("Send email");
									navigate("/message", {
										state: {
											message:
												"Password Reset Link has been sent to your mail.",
											secondaryMessage:
												"Check your spam folder as well.",
										},
									});
								})
								.catch(() => {
									setError(true);
									console.log(
										"Could not send password reset link"
									);
								});
						} else {
							setError(true);
						}
					}}
				>
					<div className="mb-8 text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
						Reset your password
					</div>

					<input
						type="text"
						className="text-md mb-2 w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Username"
						autoComplete="off"
						ref={userNameRef}
						required
						spellCheck={false}
					/>

					<button
						className={`mt-6 w-full rounded-md bg-[#61a7ec] px-3 py-2 font-serif font-bold ${
							!error
								? "bg-[#61a7ec] text-black"
								: "bg-[#89375f] text-white"
						}`}
						type="submit"
						disabled={buttonText !== "Send email"}
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};
export default ResetPasswordPage;
