import create from "./genericHTTPServices";
import { privateApiClient } from "./apiClient";

export default create("/api/content", privateApiClient);
