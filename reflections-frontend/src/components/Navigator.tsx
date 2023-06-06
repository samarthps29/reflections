import { useLocation, useNavigate } from "react-router-dom";
import { CrossIcon, PlusIcon2 } from "../icons/SVGIcons";

const Navigator = () => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className="flex flex-row items-center justify-center">
			<div className="absolute bottom-4 right-4 z-20 flex items-center justify-center rounded-md bg-[#d9e0fd] p-1">
				<button
					className=""
					onClick={() => {
						if (location.pathname === "/notes") navigate("/todo");
						else navigate("/notes");
					}}
				>
					<CrossIcon />
				</button>
			</div>
			<div className="absolute bottom-11 right-4 z-20 flex items-center justify-center rounded-md bg-[#d9e0fd] p-1">
				<button
					className=""
					onClick={() => {
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
