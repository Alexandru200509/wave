import os from "os";
import helmet from "helmet";
import express from "express";
import cluster from "cluster";
import compression from "compression";

import ipRouter from "./routes/v1/ip.route";
import Logger from "./helpers/logger.helper";
import asnRouter from "./routes/v1/asn.route";
import ispRouter from "./routes/v1/isp.route";
import cityRouter from "./routes/v1/city.route";
import rangeRouter from "./routes/v1/range.route";
import { SystemInfo } from "./helpers/system.helper";
import countryRouter from "./routes/v1/country.route";
import MaxMind from "./controllers/maxmind.controller";
import rateLimiter from "./middlewares/rate.middleware";
import geoLocationRouter from "./routes/v1/geolocation.route";
import loggerMiddleware from "./middlewares/logger.middleware";
import { ConfigInstance } from "./controllers/config.controller";
import blacklistMiddleware from "./middlewares/blacklist.middleware";

// This class represents the Wave server
class WaveServer {
    // The express application
    private server: express.Application;

    constructor() {
        this.server = express();
    }

    // This method sets up the middlewares
    public setupMiddleware() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(helmet());
        this.server.use(compression());

        this.server.use(rateLimiter);
        this.server.use(blacklistMiddleware);
        this.server.use(loggerMiddleware);
    }

    // This method sets up the additional settings
    public setupAdditionalSettings() {
        this.server.disable("trust proxy");
    }

    // This method sets up the routes
    public setupRoutes() {
        this.server.use("/api/", ipRouter);
        this.server.use("/api/", geoLocationRouter);
        this.server.use("/api/", countryRouter);
        this.server.use("/api/", asnRouter);
        this.server.use("/api/", ispRouter);
        this.server.use("/api/", rangeRouter);
        this.server.use("/api/", cityRouter);
    }

    // This method starts the server
    public start(host: string, port: number) {
        this.server.listen(port, host);
    }
}

// Check if the server is running in multithreaded mode
if (ConfigInstance.multithreaded) {
    // Check if the server is the primary instance
    if (cluster.isPrimary) {
        // Display system information
        const systemInstance = new SystemInfo(process.version, os.type(), String(process.pid), os.userInfo().username);

        systemInstance.display();

        Logger.log("green", "Loader", "Loading api \x1b[1;32mmiddlewares\x1b[0m..."); // Log the action

        Logger.log("green", "Loader", "Loading api \x1b[1;32mroutes\x1b[0m..."); // Log the action

        Logger.log("green", "Loader", "Loading api \x1b[1;32madditional settings\x1b[0m..."); // Log the action

        let serverCores = os.cpus().length; // Get the number of cores

        // Check if the number of cores is greater than the number of cores specified in the config file
        if (ConfigInstance.cores <= serverCores) {
            serverCores = ConfigInstance.cores;
        }
    
        // Fork the workers
        for (let i = 0; i < serverCores; i++) {
            cluster.fork();
        }
    
        // Log the worker's death
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
        });

        void MaxMind.validateCredentials().then((valid) => {

            // Check if the MaxMind credentials are valid
            if (!valid) {
                Logger.log("magenta", "Validator", "Invalid credentials provided, please check your config file and try again");
                process.exit(1);
            }
        
            Logger.log("blue", "Wave", `Running as \x1b[1;34m${SystemInfo.getCPUMode()}\x1b[0m with \x1b[1;34m${serverCores} cores\x1b[0m...`); // Log the action
        
            Logger.log("blue", "Wave", `Wave is now running on \x1b[1;34m${ConfigInstance.host}:${ConfigInstance.port}\x1b[0m`); // Log the action
        });
    } else {
        Logger.log("cyan", "Workers", `Worker ${process.pid} started`); // Log the action
    
        // Setup the server
        const waveServer = new WaveServer();
        waveServer.setupMiddleware();
        waveServer.setupRoutes();
        waveServer.setupAdditionalSettings();
        waveServer.start(ConfigInstance.host, ConfigInstance.port);
    }
} else {
    // Display system information
    const systemInstance = new SystemInfo(process.version, process.platform, String(process.pid), os.userInfo().username);

    systemInstance.display();

    Logger.log("green", "Loader", "Loading api \x1b[1;32mmiddlewares\x1b[0m..."); // Log the action

    Logger.log("green", "Loader", "Loading api \x1b[1;32mroutes\x1b[0m..."); // Log the action

    Logger.log("green", "Loader", "Loading api \x1b[1;32madditional settings\x1b[0m..."); // Log the action

    // Setup the server
    const waveServer = new WaveServer();
    waveServer.setupMiddleware();
    waveServer.setupRoutes();
    waveServer.setupAdditionalSettings();

    // Check if the MaxMind credentials are valid
    void MaxMind.validateCredentials().then((valid) => {

        // Check if the MaxMind credentials are valid
        if (!valid) {
            Logger.log("magenta", "Validator", "Invalid credentials provided, please check your config file and try again");
            process.exit(1);
        }

        // Start the server
        waveServer.start(ConfigInstance.host, ConfigInstance.port);

        Logger.log("blue", "Wave", `Running as \x1b[1;34m${SystemInfo.getCPUMode()}\x1b[0m...`); // Log the action
    
        Logger.log("blue", "Wave", `Wave is now running on \x1b[1;34m${ConfigInstance.host}:${ConfigInstance.port}\x1b[0m`); // Log the action
    });
}

export default WaveServer;