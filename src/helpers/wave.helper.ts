import { Request } from "express";
import { exec } from "child_process";
import { ConfigInstance } from "../controllers/config.controller";
import { WebServiceClient } from "@maxmind/geoip2-node";

class waveHelper {
    static getIPAddress(req: Request) {
        return String(req.headers["x-real-ip"] ?? req.socket.remoteAddress);
    }

    static isValidIPv4(ip: string): boolean {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

        return ipv4Regex.test(ip);
    }

    static isPublicIPv4Address(ip: string): boolean {
        // Define private IPv4 address ranges
        const privateIPv4Ranges = [
            /^10\./,
            /^192\.168\./,
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
            /^(100\.64|169\.254|192\.0\.0)\./
        ];
      
        // Check if the IP address is not in any private IPv4 range
        return !privateIPv4Ranges.some((regex) => {return regex.test(ip);});
    }

    static calculateIPRange(ip: string, subnet: string): { start: string; end: string } {
        const ipParts = ip.split(".");
        const subnetParts = subnet.split("/");
        const subnetMask = Number(subnetParts[1]);

        const ipDecimal =
            (parseInt(ipParts[0]) << 24) +
            (parseInt(ipParts[1]) << 16) +
            (parseInt(ipParts[2]) << 8) +
            parseInt(ipParts[3]);

        const subnetMaskDecimal = 0xffffffff << (32 - subnetMask);
        const networkAddress = ipDecimal & subnetMaskDecimal;

        const startIPDecimal = networkAddress + 1;
        const endIPDecimal = networkAddress + Math.pow(2, 32 - subnetMask) - 2;

        const startIP =
            (startIPDecimal >>> 24) +
            "." +
            ((startIPDecimal >> 16) & 255) +
            "." +
            ((startIPDecimal >> 8) & 255) +
            "." +
            (startIPDecimal & 255);

        const endIP =
            (endIPDecimal >>> 24) +
            "." +
            ((endIPDecimal >> 16) & 255) +
            "." +
            ((endIPDecimal >> 8) & 255) +
            "." +
            (endIPDecimal & 255);

        return { start: startIP, end: endIP };
    }

    static getHostname(ip: string): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            exec(`nslookup ${ip}`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                } else {
                    const match = stdout.match(/Name:\s+(.+)/);
                    resolve(match ? match[1].trim() : undefined);
                }
            });
        });
    }
    
    static statusCodeFormatter(statusCode: number): string {
        if (statusCode >= 200 && statusCode < 300) {
            return `\x1b[48;5;2m${statusCode} \x1b[0m`; // Green Background
        } else if (statusCode >= 300 && statusCode < 400) {
            return `\x1b[48;5;3m${statusCode} \x1b[0m`; // Yellow Background
        } else if (statusCode >= 400 && statusCode < 500) {
            return `\x1b[48;5;1m${statusCode} \x1b[0m`; // Red Background
        } else if (statusCode >= 500) {
            return `\x1b[48;5;1m${statusCode} \x1b[0m`; // Red Background
        } else {
            return "\x1b[48;5;1mUNKNOWN \x1b[0m"; // Red Background for unknown status codes
        }
    }

    static requestMethodFormatter(method: string): string {
        switch (method) {
            case "GET":
                return `\x1b[48;5;4m${method} \x1b[0m`; // Blue Background
            case "POST":
                return `\x1b[48;5;2m${method} \x1b[0m`; // Green Background
            case "PUT":
                return `\x1b[48;5;208m${method} \x1b[0m`; // Orange Background
            case "PATCH":
                return `\x1b[48;5;3m${method} \x1b[0m`; // Yellow Background
            case "DELETE":
                return `\x1b[48;5;1m${method} \x1b[0m`; // Red Background
            default:
                return `\x1b[48;5;1m${method} \x1b[0m`; // Red Background for unknown methods
        }
    }
}

export default waveHelper;