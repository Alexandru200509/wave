import os from "os";

class SystemInfo {
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

    public display() {
        console.log("\x1b[34m ██╗       ██╗ █████╗ \x1b[0m██╗   ██╗\x1b[34m\x1b[34m███████╗");
        console.log("\x1b[34m ██║  ██╗  ██║██╔══██╗\x1b[0m██║   ██║\x1b[34m\x1b[34m██╔════╝");
        console.log("\x1b[34m ╚██╗████╗██╔╝███████║\x1b[0m╚██╗ ██╔╝\x1b[34m\x1b[34m█████╗  ");
        console.log("\x1b[34m  ████╔═████║ ██╔══██║\x1b[0m ╚████╔╝ \x1b[34m\x1b[34m██╔══╝  ");
        console.log("\x1b[34m  ╚██╔╝ ╚██╔╝ ██║  ██║\x1b[0m  ╚██╔╝  \x1b[34m\x1b[34m███████╗");
        console.log("\x1b[34m   ╚═╝   ╚═╝  ╚═╝  ╚═╝\x1b[0m   ╚═╝   \x1b[34m\x1b[34m╚══════╝");

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

        const NodeVersion = "\x1b[34m" + this.NodeVersion.slice(0, 1) + "\x1b[0m" + this.NodeVersion.slice(1);
        const OSName = "\x1b[34m" + this.OS.slice(0, 1) + "\x1b[0m" + this.OS.slice(1);
        const PID = "\x1b[34m" + this.PID.slice(0, 1) + "\x1b[0m" + this.PID.slice(1);
        const User = "\x1b[34m" + this.User.slice(0, 1) + "\x1b[0m" + this.User.slice(1, 5);


        console.log("  " + NodeVersion + " \x1b[34m|\x1b[0m " + OSName + " \x1b[34m|\x1b[0m " + PID + " \x1b[34m|\x1b[0m " + User);
    }
}

export {SystemInfo};