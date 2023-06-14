import { publicApiClient } from "../api/apiClient";

export const regenerateToken = () => {
	const promise = publicApiClient.post("/api/user/refresh");
	return promise;
};
