import { Request } from "express";

class waveHelper {
    static getIPAddress(req: Request) {
        return String(req.headers["x-real-ip"] ?? req.socket.remoteAddress);
    }
}

export default waveHelper;