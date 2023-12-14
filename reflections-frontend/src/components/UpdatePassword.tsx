import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import userServices from "../api/userServices";

const UpdatePassword = () => {
	const [searchParams, _] = useSearchParams();
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [buttonText, setButtonText] = useState("Change Password");
	const [isChecking, setIsChecking] = useState(false);
	const [error, setError] = useState(true);
	const navigate = useNavigate();
	const resetToken = searchParams.get("resetToken");
	const [id, setId] = useState("");

	useEffect(() => {
		setIsChecking(true);
		userServices
			.post("/checkResetToken", { resetToken })
			.then((res) => {
				console.log("Valid reset token");
				setError(false);
				setId(res.data.id);
				setIsChecking(false);
			})
			.catch(() => {
				navigate("/message", {
					state: {
						message: "This link is no longer valid.",
						// secondaryMessage: "",
					},
				});
			});
	}, []);

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
					name="updatepasswordform"
					onSubmit={(e) => {
						e.preventDefault();
						if (
							passwordRef.current!.value ===
							confirmPasswordRef.current!.value
						) {
							setButtonText("Loading...");
							userServices
								.put("/updatePassword", {
									id: id,
									password: passwordRef.current?.value,
								})
								.then(() => {
									console.log("Password updated");
									setButtonText("Change Password");
									navigate("/message", {
										state: {
											message:
												"Password has been updated successfully.",
											secondaryMessage:
												"Log in to your account with the new password.",
										},
									});
								})
								.catch((err) => {
									console.log("Password could not updated");
									console.log(err);
									setError(true);
									setButtonText("Change Password");
								});
						} else {
							setError(true);
						}
					}}
				>
					<div className="mb-8 text-center font-serif text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl">
						Update your password
					</div>

					<input
						type="password"
						className="text-md mb-2 w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Password"
						autoComplete="off"
						ref={passwordRef}
						required
						disabled={isChecking}
						spellCheck={false}
					/>
					<input
						type="password"
						className="text-md w-full rounded-lg bg-[#2e2e2e] p-2 font-serif text-[#f0f8ff] focus:bg-[#2e2e2e] focus:outline-none"
						placeholder="Confirm Password"
						autoComplete="off"
						ref={confirmPasswordRef}
						required
						disabled={isChecking}
						spellCheck={false}
					/>
					<button
						className={`mt-6 w-full rounded-md bg-[#61a7ec] px-3 py-2 font-serif font-bold ${
							!error
								? "bg-[#61a7ec] text-black"
								: "bg-[#89375f] text-white"
						}`}
						type="submit"
						disabled={
							buttonText !== "Change Password" && isChecking
						}
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};
export default UpdatePassword;
