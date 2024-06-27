// src/helpers/system.helper.ts
import Logger from "./logger.helper";
import { ConfigInstance } from "../controllers/config.controller";

class SystemInfo {
    // System information
    private NodeVersion: string;
    private OS: string;
    private PID: string;
    private User: string;

    constructor(NodeVersion: string, OS: string, PID: string, User: string) {
        this.NodeVersion = NodeVersion;
        this.OS = OS;
        this.PID = PID;
        this.User = User;

    }

    // Displays the system information
    public display(): void {
        console.log("\x1b[34m ██╗       ██╗ █████╗ \x1b[0m██╗   ██╗\x1b[34m\x1b[34m███████╗");
        console.log("\x1b[34m ██║  ██╗  ██║██╔══██╗\x1b[0m██║   ██║\x1b[34m\x1b[34m██╔════╝");
        console.log("\x1b[34m ╚██╗████╗██╔╝███████║\x1b[0m╚██╗ ██╔╝\x1b[34m\x1b[34m█████╗  ");
        console.log("\x1b[34m  ████╔═████║ ██╔══██║\x1b[0m ╚████╔╝ \x1b[34m\x1b[34m██╔══╝  ");
        console.log("\x1b[34m  ╚██╔╝ ╚██╔╝ ██║  ██║\x1b[0m  ╚██╔╝  \x1b[34m\x1b[34m███████╗");
        console.log("\x1b[34m   ╚═╝   ╚═╝  ╚═╝  ╚═╝\x1b[0m   ╚═╝   \x1b[34m\x1b[34m╚══════╝");

        // Convert the OS name to a more readable format
        switch (this.OS) {
            case "win32":
                this.OS = "Windows";
                break;
            case "linux":
                this.OS = "Linux";
                break;
            case "darwin":
                this.OS = "MacOS";
                break;
            default:
                this.OS = "Unknown";
                break;
        }

        // Convert the Node version to a more readable format
        const NodeVersion = "\x1b[34m" + this.NodeVersion.slice(0, 1) + "\x1b[0m" + this.NodeVersion.slice(1);
        const OSName = "\x1b[34m" + this.OS.slice(0, 1) + "\x1b[0m" + this.OS.slice(1);
        const PID = "\x1b[34m" + this.PID.slice(0, 1) + "\x1b[0m" + this.PID.slice(1);
        const User = "\x1b[34m" + this.User.slice(0, 1) + "\x1b[0m" + this.User.slice(1, 5);

        // Display the system information
        console.log("  " + NodeVersion + " \x1b[34m|\x1b[0m " + OSName + " \x1b[34m|\x1b[0m " + PID + " \x1b[34m|\x1b[0m " + User);

        Logger.log("blue", "Wave", `Working directory: \x1b[1;34m${process.cwd()}\x1b[0m`);

        Logger.log("green", "Loader", `Loading \x1b[1;32m${ConfigInstance.getPath()}\x1b[0m file...`);
    }

    // Returns the CPU mode
    static getCPUMode(): string {
        return ConfigInstance.multithreaded ? "multi-threaded" : "single-threaded";
    }
}

export {SystemInfo};