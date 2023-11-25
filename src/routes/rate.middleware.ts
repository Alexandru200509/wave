import { rateLimit } from "express-rate-limit";
import { ConfigInstance } from "../controllers/config.controller";
import waveHelper from "../helpers/wave.helper";
import { Request } from "express";
import Blacklist from "../controllers/blacklist.controller";

const userBruteHistory: Record<string, number> = {};

const rateLimiter = rateLimit({
    windowMs: ConfigInstance.rateLimiter.timeout * 60 * 1000,
    max: ConfigInstance.rateLimiter.max,
    message: "Too many requests, please try again later.",
    statusCode: 429,
    handler: (req, res) => {
        res.status(429).json({ error: "Too many requests, please try again later." });

        const clientIP = waveHelper.getIPAddress(req as Request);

        userBruteHistory[clientIP] = userBruteHistory[clientIP] ? userBruteHistory[clientIP] + 1 : 1;

        if (userBruteHistory[clientIP] > ConfigInstance.rateLimiter.max) {
            console.log(`IP ${clientIP} has been banned`);
            
            Blacklist.addIPAddress(clientIP);

            delete userBruteHistory[clientIP];
        }
    }
});

export default rateLimiter;