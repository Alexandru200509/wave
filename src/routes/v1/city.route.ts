import express, { Request, Response } from "express";
import waveHelper from "../../helpers/wave.helper";
import Logger from "../../helpers/logger.helper";
import MaxMind from "../../controllers/maxmind.controller";

const router: express.Router = express.Router();

router.get("/v1/ip/city/:ip", async (req: Request, res: Response) => {
    const ip = req.params.ip;

    try {
        if (!waveHelper.isValidIPv4(ip)) {
            Logger.log("yellow", "Warn", `IP Address ${ip} is invalid`);

            return res.status(400).json({ error: "Invalid IP Address" });
        }

        if (!waveHelper.isPublicIPv4Address(ip)) {
            Logger.log("yellow", "Warn", `IP Address ${ip} is not a public IP address`);

            return res.status(400).json({ error: "Not a public IP Address" });
        }

        const response = await MaxMind.Client.city(ip);

        if (!response) {
            Logger.log("yellow", "Warn", `IP Address ${ip} not found`);

            return res.status(404).json({ error: "IP Address not found" });
        }

        res.status(200).json({
            city: {
                name: response.city?.names.en,
                code: response.subdivisions?.[0].isoCode,
                geonameid: response.city?.geonameId
            }
        });
    } catch (e) {
        Logger.log("red", "Error", `Error while fetching city of ${ip}: ${String(e)}`);

        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;