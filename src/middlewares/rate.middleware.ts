import { rateLimit } from "express-rate-limit";
import { ConfigInstance } from "../controllers/config.controller";
import waveHelper from "../helpers/wave.helper";
import { Request } from "express";
import Blacklist from "../controllers/blacklist.controller";
import Logger from "../helpers/logger.helper";

const userBruteHistory: Record<string, number> = {};

const rateLimiter = rateLimit({
    windowMs: ConfigInstance.rateLimiter.timeout * 60 * 1000,
    max: ConfigInstance.rateLimiter.max,
    message: "Too many requests, please try again later.",
    statusCode: 429,
    handler: (req, res) => {
        const ip = waveHelper.getIPAddress(req);

        try {
            const clientIP = waveHelper.getIPAddress(req);
    
            if (Blacklist.exists(clientIP)) {
                return;
            }

            Logger.log("red", "Rate Limiter", `IP ${clientIP} has been rate limited`);
            res.status(429).json({ error: "Too many requests, please try again later." });

            userBruteHistory[clientIP] = userBruteHistory[clientIP] ? userBruteHistory[clientIP] + 1 : 1;
        
            if (userBruteHistory[clientIP] > ConfigInstance.rateLimiter.retries) {
                Logger.log("red", "Rate Limiter", `IP ${clientIP} has been banned`);
        
                Blacklist.addIPAddress(clientIP);
        
                delete userBruteHistory[clientIP];
            }
        } catch (e) {
            console.log(e);
        }
    }
});

export default rateLimiter;