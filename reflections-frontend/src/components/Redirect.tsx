import { useNavigate } from "react-router-dom";

const Redirect = () => {
	const navigate = useNavigate();
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		navigate("/notes");
	} else navigate("/login");

	return <></>;
};

export default Redirect;
