import { publicApiClient } from "./api/apiClient";

export const regenerateToken = () => {
	publicApiClient
		.post("/api/user/refresh")
		.then((res) => {
			if (res.data.accessToken) {
				localStorage.setItem("accessToken", res.data.accessToken);
				return res.data.accessToken;
			}
		})
		.catch(() => {
			window.location.href = "/user";
		});
};
