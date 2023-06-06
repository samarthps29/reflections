import create from "./genericHTTPServices";
import { publicApiClient } from "./apiClient";

export default create("/api/user", publicApiClient);
