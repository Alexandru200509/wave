import os from "os";

class SystemInfo {
    private NodeVersion: string;
    private OS: string;
    private PID: number;
    private User: string;

    constructor(NodeVersion: string, OS: string, PID: number, User: string) {
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

        const OSName = "\x1b[34m" + this.OS.slice(0, 1) + "\x1b[0m" + this.OS.slice(1);

        const NVFirstLetter = this.NodeVersion.slice(0, 1);
        const NVrestOfWord = this.NodeVersion.slice(1);
        const OSfirstLetter = this.OS.slice(0, 1);
        const OSrestOfWord = this.OS.slice(1);
        const PIDfirstLetter = this.PID.toString().slice(0, 1);
        const PIDrestOfWord = this.PID.toString().slice(1);
        const UserfirstLetter = this.User.slice(0, 1);
        const UserrestOfWord = this.User.slice(1);

        console.log("\x1b[34m" + NVFirstLetter + "\x1b[0m" + NVrestOfWord + " | " + OSName + " |");
    }
}

export {SystemInfo};