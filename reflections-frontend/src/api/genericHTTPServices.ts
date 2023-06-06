import { AxiosInstance } from "axios";

class HTTPServices {
	endpoint: string;
	apiClient: AxiosInstance;
	constructor(endpoint: string, apiClient: AxiosInstance) {
		this.endpoint = endpoint;
		this.apiClient = apiClient;
	}
	post(path: string, entity: any) {
		return this.apiClient.post(this.endpoint + path, entity);
	}
	put(id: string, entity: any) {
		return this.apiClient.put(this.endpoint + "/" + id, entity);
	}
}

const create = (endpoint: string, apiClient: AxiosInstance) => {
	return new HTTPServices(endpoint, apiClient);
};

export default create;
