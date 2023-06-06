import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			console.log(accessToken);
			navigate("/notes");
		} else navigate("/login");
	});

	return <></>;
};

export default Redirect;
