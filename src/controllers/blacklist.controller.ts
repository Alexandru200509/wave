// src/controllers/blacklist.controller.ts
import Logger from "../helpers/logger.helper";
import waveHelper from "../helpers/wave.helper";
import { ConfigInstance } from "./config.controller";

class Blacklist {

    // Adds an IP address to the blacklist
    static addIPAddress(ip: string): void {
        try {
            // Check if the IP address is already in the blacklist
            if (ConfigInstance.blacklist.includes(ip)) {
                return;
            }
            
            ConfigInstance.blacklist.push(ip); // Add the IP address to the blacklist
            ConfigInstance.save(); // Save the configuration and updates the blacklist
        } catch (e) {      
            Logger.log("red", "Blacklist", `Failed to add IP address ${ip} to the blacklist`); // Log the error
            waveHelper.displayDebugError(e as string); // Display the error in the console   
        }
    }

    // Removes an IP address from the blacklist
    static removeIPAddress(ip: string): void {
        try {
            // Check if the IP address is not in the blacklist
            if (!ConfigInstance.blacklist.includes(ip)) {
                return;
            }
            
            // Remove the IP address from the blacklist
            ConfigInstance.blacklist = ConfigInstance.blacklist.filter((bannedIP) => {return bannedIP !== ip;});
            ConfigInstance.save(); // Save the configuration and updates the blacklist
        } catch (e) {
            Logger.log("red", "Blacklist", `Failed to remove IP address ${ip} from the blacklist`); // Log the error
            waveHelper.displayDebugError(e as string); // Display the error in the console   
        }
    }

    // Checks if an IP address exists in the blacklist
    static exists(ip: string): boolean {
        return ConfigInstance.blacklist.includes(ip);
    }
}

export default Blacklist;