import { ConfigInstance } from "./controllers/config.controller";

import express from "express";
import cluster from "cluster";
import os from "os";

class WaveServer {
    private expressServer: express.Application;

    constructor() {
        this.expressServer = express();
    }

    public setupMiddleware() {
        this.expressServer.use(express.json());
    }

    public setupRoutes() {
        this.expressServer.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }

    public start(host: string, port: number) {
        this.expressServer.listen(port, host, () => {
            console.log(`Server started on ${host}:${port}`);
        });
    }
}

if (cluster.isPrimary) {
    const numberCores = os.cpus().length;

    console.log(`Number of cores: ${numberCores}`);
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numberCores; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    console.log(`Worker ${process.pid} started`);

    const waveServer = new WaveServer();
    waveServer.setupRoutes();
    waveServer.start(ConfigInstance.host, ConfigInstance.port);
}