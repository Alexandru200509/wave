import express, { Request, Response } from "express";
import waveHelper from "../../helpers/wave.helper";
import Logger from "../../helpers/logger.helper";
import MaxMind from "../../controllers/maxmind.controller";

const router: express.Router = express.Router();

router.get("/v1/ip/:ip", async (req: Request, res: Response) => {
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

        const range = waveHelper.calculateIPRange(ip, response.traits.network?.toString() ?? ip + "/0");
        const hostname = await waveHelper.getHostname(ip).then((hostname) => {return hostname;}).catch((e) => {return e as string;});

        res.status(200).json({
            ipaddress: response.traits.ipAddress,
            hostname: hostname,
            isp: response.traits.isp ?? "Unknown",
            organization: response.traits.organization ?? "Unknown",
            range: range.start + " - " + range.end,
            asn: response.traits.autonomousSystemNumber,
            network: response.traits.network,
            continent: {
                name: response.continent?.names.en,
                code: response.continent?.code,
                geonameid: response.continent?.geonameId
            },
            country: {
                name: response.country?.names.en,
                code: response.country?.isoCode,
                geonameid: response.country?.geonameId
            },
            registered_country: {
                name: response.registeredCountry?.names.en,
                code: response.registeredCountry?.isoCode,
                geonameid: response.registeredCountry?.geonameId
            },
            city: {
                name: response.city?.names.en,
                code: response.subdivisions?.[0].isoCode,
                geonameid: response.city?.geonameId
            },
            location: {
                accuracy_radius: response.location?.accuracyRadius,
                latitude: response.location?.latitude,
                longitude: response.location?.longitude,
                timezone: response.location?.timeZone,
                postalcode: response.postal?.code
            },
            details: {
                isanonymous: response.traits.isAnonymous,
                isanonymousproxy: response.traits.isAnonymousProxy,
                isanonymousvpn: response.traits.isAnonymousVpn,
                ishostingprovider: response.traits.isHostingProvider,
                islegitimateproxy: response.traits.isLegitimateProxy,
                ispublicproxy: response.traits.isPublicProxy,
                isresidentialproxy: response.traits.isResidentialProxy,
                issatelliteprovider: response.traits.isSatelliteProvider,
                istorexitnode: response.traits.isTorExitNode
            }
        });
    } catch (e) {
        Logger.log("red", "Error", `Error while fetching IP details of ${ip}: ${String(e)}`);

        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
