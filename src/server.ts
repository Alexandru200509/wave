import os from "os";
import helmet from "helmet";
import express from "express";
import cluster from "cluster";
import compression from "compression";
import rateLimiter from "./middlewares/rate.middleware";
import { SystemInfo } from "./helpers/system.helper";
import { ConfigInstance } from "./controllers/config.controller";
import blacklistMiddleware from "./middlewares/blacklist.middleware";

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
    }

    public setupAdditionalSettings() {
        this.server.enable("trust proxy");
    }

    public setupRoutes() {
        this.server.get("/", (req, res) => {
            res.status(200).json({ message: "Hello World"});
        });
    }

    public start(host: string, port: number) {
        this.server.listen(port, host, () => {

            console.log(`Server started on ${host}:${port}`);
        });
    }
}

if (ConfigInstance.multithreaded) {
    if (cluster.isPrimary) {
        const systemInstance = new SystemInfo(process.version, os.type(), String(process.pid), os.userInfo().username);

        systemInstance.display();

        let serverCores = os.cpus().length;

        if (ConfigInstance.cores <= serverCores) {
            serverCores = ConfigInstance.cores;
        }
    
        console.log(`Number of cores: ${serverCores}`);
        console.log(`Primary ${process.pid} is running`);
    
        for (let i = 0; i < serverCores; i++) {
            cluster.fork();
        }
    
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
        });
    } else {
        console.log(`Worker ${process.pid} started`);
    
        const waveServer = new WaveServer();
        waveServer.setupMiddleware();
        waveServer.setupRoutes();
        waveServer.start(ConfigInstance.host, ConfigInstance.port);
    }
} else {
    const systemInstance = new SystemInfo(process.version, process.platform, String(process.pid), os.userInfo().username);

    systemInstance.display();

    const waveServer = new WaveServer();
    waveServer.setupMiddleware();
    waveServer.setupRoutes();
    waveServer.start(ConfigInstance.host, ConfigInstance.port);
}