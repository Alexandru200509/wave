// src/controllers/config.controller.ts
import fs from "fs";

import Logger from "../helpers/logger.helper";
import waveHelper from "../helpers/wave.helper";
import { RateLimiterInterface, MaxMindInterface } from "../interfaces/config.interface";

class Config {
    // The path to the config file
    private path: string;

    // The properties of the config file
    public debug: boolean = false;
    public host: string = "127.0.0.1";
    public port: number = 7446;
    public logs: boolean = true;
    public multithreaded: boolean = false;
    public cores: number = 4;
    public blacklist: string[] = [];
    public rateLimiter: RateLimiterInterface = {
        max: 100,
        retries: 5,
        timeout: 15
    };
    public maxMind: MaxMindInterface = {
        accountID: "",
        licenseKey: ""
    };

    // The constructor will try to read the config file and assign the properties to the instance
    constructor(path: string) {
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
            waveHelper.displayDebugError(e as string); // Display the error in the console   
        }
    }

    // Retrieve the path of the config file
    public getPath(): string {
        return this.path;
    }

    // This function saves the config file
    public save(): void {
        // Try to save the config file
        try {
            Logger.log("green", "Config", `Saving config file to ${this.path}...`); // Log the action

            fs.writeFileSync(this.path, JSON.stringify(this, null, 4), "utf-8"); // Write the config file
        } catch (e) {
            Logger.log("red", "Config", `Failed to save config file to ${this.path}!`); // Log the error
            waveHelper.displayDebugError(e as string); // Display the error in the console   
        }
    }
}

// Create an instance of the Config class
const ConfigInstance = new Config("config.json");

export {
    Config,
    ConfigInstance
};