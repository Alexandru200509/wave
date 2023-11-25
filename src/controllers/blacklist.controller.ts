import { ConfigInstance } from "./config.controller";

class Blacklist {
    static addIPAddress(ip: string) {
        try {
            ConfigInstance.blacklist.push(ip);
            ConfigInstance.save();
        } catch (e) {
            console.log(e);
        }
    }

    static removeIPAddress(ip: string) {
        try {
            ConfigInstance.blacklist = ConfigInstance.blacklist.filter((bannedIP) => {return bannedIP !== ip;});
            ConfigInstance.save();
        } catch (e) {
            console.log(e);
        }
    }

    static exists(ip: string) {
        return ConfigInstance.blacklist.includes(ip);
    }
}

export default Blacklist;