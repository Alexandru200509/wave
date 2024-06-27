// src/controllers/maxmind.controller.ts
import { WebServiceClient } from "@maxmind/geoip2-node";

import Logger from "../helpers/logger.helper";
import waveHelper from "../helpers/wave.helper";
import { ConfigInstance } from "./config.controller";

class MaxMind {
    // Global MaxMind client
    static Client: WebServiceClient = new WebServiceClient(ConfigInstance.maxMind.accountID, ConfigInstance.maxMind.licenseKey, { host: "geolite.info" });

    // Validates the MaxMind credentials
    static async validateCredentials() {
        // Check if the MaxMind credentials are valid
        try {
            Logger.log("magenta", "Validator", "Validating \x1b[1;35mMaxMind\x1b[0m credentials..."); // Log the action

            const response = await this.Client.city("1.1.1.1"); // Fetch the IP address
    
            // Check if the response is valid
            if (!response.traits.network) {
                return false;
            }
    
            Logger.log("magenta", "Validator", "\x1b[1;35mMaxMind\x1b[0m credentials are \x1b[1;35mvalid\x1b[0m!"); // Log the action
            
            return true;
        } catch (e) {
            waveHelper.displayDebugError(e as string); // Display the error in the console   
            
            return false; 
        }
    }
}

export default MaxMind;