import { rateLimit } from "express-rate-limit";
import { ConfigInstance } from "../controllers/config.controller";

const rateLimiter = rateLimit({
    windowMs: ConfigInstance.rateLimiter.timeout * 60 * 1000,
    max: ConfigInstance.rateLimiter.max,
    message: "Too many requests, please try again later.",
    statusCode: 429,
    handler: (req, res) => {
        res.status(429).json({ error: "Too many requests, please try again later." });
    }
});

export default rateLimiter;