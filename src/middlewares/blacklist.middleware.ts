import { Request, Response, NextFunction } from "express";
import Blacklist from "../controllers/blacklist.controller";
import waveHelper from "../helpers/wave.helper";
import Logger from "../helpers/logger.helper";

const blacklistMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = waveHelper.getIPAddress(req);

    if (Blacklist.exists(String(ip))) {
        Logger.log("red", "Blacklist", `A restricted IP (${String(ip)}) tried to access the server`);    
    } else {
        next();
    }
};

export default blacklistMiddleware;