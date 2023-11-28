import { Request, Response, NextFunction, Send } from "express";
import Blacklist from "../controllers/blacklist.controller";
import waveHelper from "../helpers/wave.helper";
import Logger from "../helpers/logger.helper";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = waveHelper.getIPAddress(req);

    const start = new Date();
    const end = new Date();
    const latency = end.getTime() - start.getTime();

    const route = req.originalUrl;
    const method = req.method;
    const statusCode = res.statusCode;

    Logger.log("cyan", "Request", `${waveHelper.statusCodeFormatter(statusCode)} | ${waveHelper.requestMethodFormatter(method)} | ${route} | ${ip} | ${latency}ms`);

    next();
};

export default loggerMiddleware;