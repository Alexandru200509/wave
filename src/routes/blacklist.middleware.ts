import { Request, Response, NextFunction } from "express";
import Blacklist from "../controllers/blacklist.controller";
import waveHelper from "../helpers/wave.helper";

const blacklistMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = waveHelper.getIPAddress(req);

    if (Blacklist.exists(String(ip))) {
        console.log(`IP ${String(ip)} tried to access the server but it's banned`);
        return res
            .status(403)
            .json({ error: "You are banned from this server" });
    } else {
        next();
    }
};

export default blacklistMiddleware;