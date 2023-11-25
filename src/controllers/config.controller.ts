// src/controllers/config.controller.ts
import fs from "fs";

import { RateLimiterInterface } from "../interfaces/config.interface";

class Config {
    // The path to the config file
    private path: string;

    // The properties of the config file
    public debug: boolean = false;
    public host: string = "127.0.0.1";
    public port: number = 7446;
    public logs: boolean = true;
    public blacklist: string[] = [];
    public rateLimiter: RateLimiterInterface = {
        max: 100,
        timeout: 1000
    };

    // The constructor will try to read the config file and assign the properties to the instance
    constructor(path: string) {
        // Try to read the config file
        try {
            // Read the config file
            const configData = fs.readFileSync(path, "utf-8");
            const parsedConfig = JSON.parse(configData);

            // Assign the path to the instance
            this.path = path;

            // Assign the properties from parsedConfig to the instance
            Object.assign(this, parsedConfig);
        } catch (e) {
            // File doesn't exist, create it with default data
            fs.writeFileSync(path, JSON.stringify(this, null, 4), "utf-8");
        }
    }

    // This function displays the config file path
    public getPath() {
        return this.path;
    }

    // This function saves the config file
    public save() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this, null, 4), "utf-8");
        } catch (e) {
            console.log(e);
        }
    }
}

// Create an instance of the Config class
const ConfigInstance = new Config("config.json");

export {
    Config,
    ConfigInstance
};