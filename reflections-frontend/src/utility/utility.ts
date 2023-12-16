import { publicApiClient } from "../api/apiClient";

export const htmlTagRegex = /<[^>]*>/g;
export const nameRegex = /^[a-zA-Z\s]+$/;
export const usernameRegex = /^[a-zA-Z0-9_]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const regenerateToken = () => {
	const promise = publicApiClient.post("/api/user/refresh");
	return promise;
};

export const removeHtmlTags = (htmlText: string) => {
	return htmlText.replace(htmlTagRegex, "");
};
