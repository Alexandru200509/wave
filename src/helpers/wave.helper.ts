import { Request } from "express";
import { ConfigInstance } from "../controllers/config.controller";
import { WebServiceClient } from "@maxmind/geoip2-node";

class waveHelper {
    static maxmindClient: WebServiceClient = new WebServiceClient( ConfigInstance.maxMind.accountID, ConfigInstance.maxMind.licenseKey, {host: "geolite.info"});

    static getIPAddress(req: Request) {
        return String(req.headers["x-real-ip"] ?? req.socket.remoteAddress);
    }
}

export default waveHelper;