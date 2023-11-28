import { Request, Response, NextFunction } from "express";

import Logger from "../helpers/logger.helper";
import waveHelper from "../helpers/wave.helper";

// This middleware logs the request
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = waveHelper.getIPAddress(req); // Get the IP address

    // Get the latency
    const start = new Date();
    const end = new Date();
    const latency = end.getTime() - start.getTime();

    // Get the route, method, and status code
    const route = req.originalUrl;
    const method = req.method;
    const statusCode = res.statusCode;

    // Log the request
    Logger.log("cyan", "Request", `${waveHelper.statusCodeFormatter(statusCode)} | ${waveHelper.requestMethodFormatter(method)} | ${route} | ${ip} | ${latency}ms`);

    next(); // Continue
};

export default loggerMiddleware;