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
        const NVFirstLetter = this.NodeVersion.slice(0, 1);
        const NVrestOfWord = this.NodeVersion.slice(1);
        const OSfirstLetter = this.OS.slice(0, 1);
        const OSrestOfWord = this.OS.slice(1);
        const PIDfirstLetter = this.PID.toString().slice(0, 1);
        const PIDrestOfWord = this.PID.toString().slice(1);
        const UserfirstLetter = this.User.slice(0, 1);
        const UserrestOfWord = this.User.slice(1);
        console.log("\x1b[34m" + NVFirstLetter + "\x1b[0m" + NVrestOfWord + "| "+"\x1b[34m" + OSfirstLetter + "\x1b[0m" + OSrestOfWord + " |");
    }
}

export {SystemInfo};