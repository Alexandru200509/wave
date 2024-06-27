import express, { Request, Response } from "express";

import Logger from "../../helpers/logger.helper";
import waveHelper from "../../helpers/wave.helper";
import MaxMind from "../../controllers/maxmind.controller";

const router: express.Router = express.Router();

// This route gets the ASN of an IP address
router.get("/v1/ip/asn/:ip", async (req: Request, res: Response) => {
    const ip = req.params.ip; // Get the IP address from the request

    try {
        // Check if the IP address is valid
        if (!waveHelper.isValidIPv4(ip)) {
            Logger.log("yellow", "Warn", `IP Address ${ip} is invalid`);

            return res.status(400).json({ error: "Invalid IP Address" });
        }

        // Check if the IP address is public
        if (!waveHelper.isPublicIPv4Address(ip)) {
            Logger.log("yellow", "Warn", `IP Address ${ip} is not a public IP address`);

            return res.status(400).json({ error: "Not a public IP Address" });
        }

        const response = await MaxMind.Client.city(ip); // Get the response from MaxMind

        // Check if the response is null
        if (!response) {
            Logger.log("yellow", "Warn", `IP Address ${ip} not found`);

            return res.status(404).json({ error: "IP Address not found" });
        }

        Logger.log("cyan", "Response", `IP: ${ip} | ASN: ${response.traits.autonomousSystemNumber ?? "Unknown"}`); // Log the response

        res.status(200).json({ asn: response.traits.autonomousSystemNumber ?? "Unknown" }); // Return the ASN
    } catch (e) {
        Logger.log("red", "Error", `Error while fetching ASN of ${ip}: ${String(e)}`); // Log the error

        res.status(500).json({ message: "Internal Server Error" }); // Return an error
    }
});

export default router;