import { Request, Response, NextFunction } from "express";
import { ConfigInstance } from "../controllers/config.controller";
import Blacklist from "../controllers/blacklist.controller";

const blacklistMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers["x-real-ip"] ?? req.socket.remoteAddress;

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