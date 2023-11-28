import os from "os";
import helmet from "helmet";
import express from "express";
import cluster from "cluster";
import compression from "compression";
import rateLimiter from "./middlewares/rate.middleware";
import { SystemInfo } from "./helpers/system.helper";
import { Config, ConfigInstance } from "./controllers/config.controller";
import blacklistMiddleware from "./middlewares/blacklist.middleware";
import ipRouter from "./routes/v1/ip.route";
import geoLocationRouter from "./routes/v1/geolocation.route";
import countryRouter from "./routes/v1/country.route";
import asnRouter from "./routes/v1/asn.route";
import ispRouter from "./routes/v1/isp.route";
import rangeRouter from "./routes/v1/range.route";
import cityRouter from "./routes/v1/city.route";

import Logger from "./helpers/logger.helper";
import MaxMind from "./controllers/maxmind.controller";
import loggerMiddleware from "./middlewares/logger.middleware";

class WaveServer {
    private server: express.Application;

    constructor() {
        this.server = express();
    }

    public setupMiddleware() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(helmet());
        this.server.use(compression());

        this.server.use(rateLimiter);
        this.server.use(blacklistMiddleware);
        this.server.use(loggerMiddleware);
    }

    public setupAdditionalSettings() {
        this.server.disable("trust proxy");
    }

    public setupRoutes() {
        this.server.use("/api/", ipRouter);
        this.server.use("/api/", geoLocationRouter);
        this.server.use("/api/", countryRouter);
        this.server.use("/api/", asnRouter);
        this.server.use("/api/", ispRouter);
        this.server.use("/api/", rangeRouter);
        this.server.use("/api/", cityRouter);
    }

    public start(host: string, port: number) {
        this.server.listen(port, host, () => {

        });
    }
}

if (ConfigInstance.multithreaded) {
    if (cluster.isPrimary) {
        const systemInstance = new SystemInfo(process.version, os.type(), String(process.pid), os.userInfo().username);

        systemInstance.display();

        Logger.log("green", "Loader", "Loading api \x1b[1;32mmiddlewares\x1b[0m...");

        Logger.log("green", "Loader", "Loading api \x1b[1;32mroutes\x1b[0m...");

        Logger.log("green", "Loader", "Loading api \x1b[1;32madditional settings\x1b[0m...");

        let serverCores = os.cpus().length;

        if (ConfigInstance.cores <= serverCores) {
            serverCores = ConfigInstance.cores;
        }
    
        for (let i = 0; i < serverCores; i++) {
            cluster.fork();
        }
    
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
        });

        void MaxMind.validateCredentials().then((valid) => {
            if (!valid) {
                Logger.log("magenta", "Validator", "Invalid credentials provided, please check your config file and try again");
                process.exit(1);
            }
        
            Logger.log("blue", "Wave", `Running as \x1b[1;34m${SystemInfo.getCPUMode()}\x1b[0m with \x1b[1;34m${serverCores} cores\x1b[0m...`);
        
            Logger.log("blue", "Wave", `Wave is now running on \x1b[1;34m${ConfigInstance.host}:${ConfigInstance.port}\x1b[0m`);
        });
    } else {
        Logger.log("cyan", "Workers", `Worker ${process.pid} started`);
    
        const waveServer = new WaveServer();
        waveServer.setupMiddleware();
        waveServer.setupRoutes();
        waveServer.setupAdditionalSettings();
        waveServer.start(ConfigInstance.host, ConfigInstance.port);
    }
} else {
    const systemInstance = new SystemInfo(process.version, process.platform, String(process.pid), os.userInfo().username);

    systemInstance.display();

    Logger.log("green", "Loader", "Loading api \x1b[1;32mmiddlewares\x1b[0m...");

    Logger.log("green", "Loader", "Loading api \x1b[1;32mroutes\x1b[0m...");

    Logger.log("green", "Loader", "Loading api \x1b[1;32madditional settings\x1b[0m...");

    const waveServer = new WaveServer();
    waveServer.setupMiddleware();
    waveServer.setupRoutes();
    waveServer.setupAdditionalSettings();

    void MaxMind.validateCredentials().then((valid) => {
        if (!valid) {
            Logger.log("magenta", "Validator", "Invalid credentials provided, please check your config file and try again");
            process.exit(1);
        }

        waveServer.start(ConfigInstance.host, ConfigInstance.port);

        Logger.log("blue", "Wave", `Running as \x1b[1;34m${SystemInfo.getCPUMode()}\x1b[0m...`);
    
        Logger.log("blue", "Wave", `Wave is now running on \x1b[1;34m${ConfigInstance.host}:${ConfigInstance.port}\x1b[0m`);
    });
}

export default WaveServer;