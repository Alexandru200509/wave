import { WebServiceClient } from "@maxmind/geoip2-node";
import { ConfigInstance } from "./config.controller";
import Logger from "../helpers/logger.helper";

class MaxMind {
    static Client: WebServiceClient = new WebServiceClient(ConfigInstance.maxMind.accountID, ConfigInstance.maxMind.licenseKey, { host: "geolite.info" });

    static async validateCredentials() {
        try {
            Logger.log("magenta", "Validator", "Validating \x1b[1;35mMaxMind\x1b[0m credentials...");

            const response = await this.Client.city("1.1.1.1");
    
            if (!response.traits.network) {
                return false;
            }
    
            Logger.log("magenta", "Validator", "\x1b[1;35mMaxMind\x1b[0m credentials are \x1b[1;35mvalid\x1b[0m!");
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default MaxMind;