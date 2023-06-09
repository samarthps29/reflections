import { useLocation, useNavigate } from "react-router-dom";
import { CrossIcon, PlusIcon2 } from "../icons/SVGIcons";
import userServices from "../api/userServices";

const Navigator = ({
	setFullScreen,
}: {
	setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className="absolute bottom-12 right-12 z-20 grid scale-90 grid-cols-3 items-center justify-center gap-1 md:bottom-14 md:right-14 md:scale-100">
			<div className="flex items-center justify-center rounded-md bg-[#d9e0fd] p-1">
				<button
					title="Fullscreen"
					className=""
					onClick={() => setFullScreen((prev) => !prev)}
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
						localStorage.removeItem("accessToken");
						localStorage.removeItem("userName");
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
