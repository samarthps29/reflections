import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HandleRouteNotFound = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate("/", { replace: true });
			// navigate(-1);
		}, 3000);
	}, []);
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center bg-[#1c1c1c]">
			<p className="font-serif text-4xl font-semibold text-white md:text-5xl lg:text-7xl">
				404 Not Found
			</p>
			<p className="font-serif text-lg font-medium text-white md:text-xl lg:text-2xl">
				The page you are looking for does not exist.
			</p>
		</div>
	);
};

export default HandleRouteNotFound;
