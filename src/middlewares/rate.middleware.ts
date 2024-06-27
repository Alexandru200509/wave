import { rateLimit } from "express-rate-limit";

import Logger from "../helpers/logger.helper";
import waveHelper from "../helpers/wave.helper";
import Blacklist from "../controllers/blacklist.controller";
import { ConfigInstance } from "../controllers/config.controller";

const userBruteHistory: Record<string, number> = {}; // Stores the number of requests made by an IP address

// This middleware checks if the IP address is blacklisted
const rateLimiter = rateLimit({
    windowMs: ConfigInstance.rateLimiter.timeout * 60 * 1000, // 15 minutes
    max: ConfigInstance.rateLimiter.max, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.", // Message to send when the user is rate limited
    statusCode: 429, // Status code to send when the user is rate limited
    handler: (req, res) => { // Handler to execute when the user is rate limited
        const ip = waveHelper.getIPAddress(req); // Get the IP address

        try {
            const clientIP = waveHelper.getIPAddress(req); // Get the IP address
    
            // Check if the IP address is blacklisted
            if (Blacklist.exists(clientIP)) {
                return;
            }

            Logger.log("red", "Rate Limiter", `IP ${clientIP} has been rate limited`); // Log the IP address
            res.status(429).json({ error: "Too many requests, please try again later." }); // Send the error message

            // Add the IP address to the blacklist
            userBruteHistory[clientIP] = userBruteHistory[clientIP] ? userBruteHistory[clientIP] + 1 : 1;

            console.log(userBruteHistory[clientIP]);
        
            // Check if the IP address has exceeded the maximum number of retries
            if (userBruteHistory[clientIP] > ConfigInstance.rateLimiter.retries) {
                Logger.log("red", "Rate Limiter", `IP ${clientIP} has been banned`); // Log the IP address
        
                Blacklist.addIPAddress(clientIP); // Add the IP address to the blacklist
        
                delete userBruteHistory[clientIP]; // Delete the IP address from the brute history
            }
        } catch (e) {
            Logger.log("red", "Rate Limiter", `Error while rate limiting ${ip}: ${String(e)}`); // Log the error    
        }
    }
});

export default rateLimiter;