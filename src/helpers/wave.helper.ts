import { Request } from "express";

class waveHelper {
    static getIPAddress(req: Request) {
        if (req.socket.remoteAddress) {
            return req.socket.remoteAddress;
        }

        console.log("Error while getting IP address");

        return "";
    }
}

export default waveHelper;