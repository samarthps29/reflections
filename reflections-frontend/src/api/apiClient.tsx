import axios from "axios";
import jwtDecode from "jwt-decode";
import { regenerateToken } from "../utility/utility";

const publicApiClient = axios.create({
	baseURL: "",
	// baseURL: "http://localhost:5000",
});

const privateApiClient = axios.create({
	baseURL: "",
	// baseURL: "http://localhost:5000",
	withCredentials: true,
});

privateApiClient.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");
	const currDate = new Date();
	let decodedToken: { exp: number }, expTime;

	if (accessToken) {
		decodedToken = jwtDecode(accessToken);
		expTime = decodedToken.exp;
	}

	if ((expTime && expTime * 1000 < currDate.getTime()) || !accessToken) {
		const promise = regenerateToken();
		promise
			.then((res) => {
				if (res.data.accessToken) {
					localStorage.setItem("accessToken", res.data.accessToken);
					config.headers[
						"Authorization"
					] = `Bearer ${res.data.accessToken}`;
				}
			})
			.catch(() => {
				console.log("Session Expired/No access token");
				window.location.href = "/login";
			});
	} else {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}

	return config;
});

export { privateApiClient, publicApiClient };
