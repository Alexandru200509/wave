import { Request, Response, NextFunction } from "express";

import Logger from "../helpers/logger.helper";
import waveHelper from "../helpers/wave.helper";
import Blacklist from "../controllers/blacklist.controller";

// This middleware checks if the IP address is blacklisted
const blacklistMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get the IP address
    const ip = waveHelper.getIPAddress(req);

    // Check if the IP address is blacklisted
    if (Blacklist.exists(String(ip))) {
        Logger.log("red", "Blacklist", `A restricted IP (${String(ip)}) tried to access the server`); // Log the IP address
    } else {
        next(); // If the IP address is not blacklisted, continue
    }
};

export default blacklistMiddleware;