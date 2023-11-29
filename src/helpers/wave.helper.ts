// src/helpers/wave.helper.ts
import { Request } from "express";
import { exec } from "child_process";

import Logger from "./logger.helper";
import { ConfigInstance } from "../controllers/config.controller";

class waveHelper {

    // Get the IP address of the client
    static getIPAddress(req: Request): string {
        return String(req.headers["x-real-ip"] ?? req.socket.remoteAddress);
    }

    // Check if the IP address is a valid IPv4 address
    static isValidIPv4(ip: string): boolean {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regex for IPv4 addresses

        return ipv4Regex.test(ip); // Return true if the IP address matches the regex
    }

    // Check if the IP address is a public IPv4 address
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

    // Calculate the IP range of an IP address
    static calculateIPRange(ip: string, subnet: string): { start: string; end: string } {
        // Split the IP address and subnet into parts
        const ipParts = ip.split(".");
        const subnetParts = subnet.split("/");
        const subnetMask = Number(subnetParts[1]);

        // Calculate the IP address in decimal
        const ipDecimal =
            (parseInt(ipParts[0]) << 24) +
            (parseInt(ipParts[1]) << 16) +
            (parseInt(ipParts[2]) << 8) +
            parseInt(ipParts[3]);

        // Calculate the subnet mask in decimal
        const subnetMaskDecimal = 0xffffffff << (32 - subnetMask);
        const networkAddress = ipDecimal & subnetMaskDecimal;

        // Calculate the start and end IP addresses in decimal
        const startIPDecimal = networkAddress + 1;
        const endIPDecimal = networkAddress + Math.pow(2, 32 - subnetMask) - 2;

        // Convert the start and end IP addresses to dotted decimal notation
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

    // Get the hostname of an IP address
    static getHostname(ip: string): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            // Execute the nslookup command
            exec(`nslookup ${ip}`, (error, stdout, stderr) => {
                // Check if the command failed
                if (error) {
                    reject(`Error: ${error.message}`);
                } else {
                    // Get the hostname from the output
                    const match = stdout.match(/Name:\s+(.+)/);
                    resolve(match ? match[1].trim() : undefined);
                }
            });
        });
    }
    
    // Format the status code
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

    // Format the request method
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

    // Display additional debug errors
    static displayDebugError(error: string): void {
        // Check if the debug mode is enabled
        if (ConfigInstance.debug) {
            Logger.log("yellow", "Debug", error); // Log the error
        }
    }
}

export default waveHelper;