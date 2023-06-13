import { useNavigate } from "react-router-dom";
import userServices from "../api/userServices";
import { CrossIcon } from "../icons/SVGIcons";

const Navigator = () => {
	const navigate = useNavigate();
	return (
		<div className="absolute bottom-8 right-8 z-20 grid scale-90 grid-cols-1 items-center justify-center gap-1 md:bottom-14 md:right-14 md:scale-100">
			<div className="flex items-center justify-center rounded-md bg-stone-900 p-1">
				<button
					title="Logout"
					className=""
					onClick={() => {
						userServices.get("/logout");
						navigate("/login");
					}}
				>
					<CrossIcon />
				</button>
			</div>
		</div>
	);
};

export default Navigator;
