import { AxiosInstance } from "axios";

/**
 * Base class for services that communicate with the API.
 */
abstract class BaseService {
  /**
   * Create a new service.
   * @param params The AxiosInstance to send HTTP requests to the API.
   */
  constructor(protected client: AxiosInstance) {}
}

export default BaseService;