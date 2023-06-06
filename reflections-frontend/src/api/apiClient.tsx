import axios from "axios";
import jwtDecode from "jwt-decode";
import { regenerateToken } from "../utility";

const publicApiClient = axios.create({
	baseURL: "",
	withCredentials: true,
});

const privateApiClient = axios.create({
	baseURL: "",
	withCredentials: true,
});

privateApiClient.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");
	const currDate = new Date();
	const decodedToken: { exp: number } = jwtDecode(accessToken!);
	const expTime = decodedToken!.exp;
	if (expTime * 1000 < currDate.getTime()) {
		const newToken = regenerateToken();
		config.headers["Authorization"] = `Bearer ${newToken}`;
	} else {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}

	return config;
});

export { publicApiClient, privateApiClient };
