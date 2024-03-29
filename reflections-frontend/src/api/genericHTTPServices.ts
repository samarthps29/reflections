import { AxiosInstance } from "axios";

class HTTPServices {
	endpoint: string;
	apiClient: AxiosInstance;
	constructor(endpoint: string, apiClient: AxiosInstance) {
		this.endpoint = endpoint;
		this.apiClient = apiClient;
	}
	get(path: string) {
		return this.apiClient.get(this.endpoint + path);
	}
	post(path: string, entity: any) {
		return this.apiClient.post(this.endpoint + path, entity);
	}
	put(id: string, entity: any) {
		return this.apiClient.put(this.endpoint + "/" + id, entity);
	}
	delete(id: string) {
		return this.apiClient.delete(this.endpoint + "/" + id);
	}
}

const create = (endpoint: string, apiClient: AxiosInstance) => {
	return new HTTPServices(endpoint, apiClient);
};

export default create;
