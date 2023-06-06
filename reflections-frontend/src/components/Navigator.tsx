import { useLocation, useNavigate } from "react-router-dom";
import { CrossIcon, PlusIcon2 } from "../icons/SVGIcons";
import userServices from "../api/userServices";

const Navigator = () => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className="absolute bottom-4 right-4 z-20 grid grid-cols-1 items-center justify-center gap-1">
			<div className="flex items-center justify-center rounded-md bg-[#d9e0fd] p-1">
				<button
					title="Login"
					className=""
					onClick={() => {
						navigate("/login");
					}}
				>
					<PlusIcon2 />
				</button>
			</div>
			<div className="flex items-center justify-center rounded-md bg-[#d9e0fd] p-1">
				<button
					title="Switch"
					className=""
					onClick={() => {
						if (location.pathname === "/notes") navigate("/todo");
						else navigate("/notes");
					}}
				>
					<CrossIcon />
				</button>
			</div>
			<div className="flex items-center justify-center rounded-md bg-[#d9e0fd] p-1">
				<button
					title="Logout"
					className=""
					onClick={() => {
						userServices.get("/logout");
						navigate("/login");
					}}
				>
					<PlusIcon2 />
				</button>
			</div>
		</div>
	);
};

export default Navigator;
