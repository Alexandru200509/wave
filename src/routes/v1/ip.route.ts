import express, { Request, Response } from "express";
import waveHelper from "../../helpers/wave.helper";

const router: express.Router = express.Router();

router.get("/v1/ipaddress/:ip", async (req: Request, res: Response) => {
    const ip = req.params.ip;

    try {
        const response = await waveHelper.maxmindClient.city(ip);

        if (response.continent && response.country && response.city && response.location) {
            res.status(200).json({
                continent: response.continent.names.en,
                country: response.country.names.en,
                city: response.city.names.en,
                latitude: response.location.latitude,
                longitude: response.location.longitude
            });
        }
    } catch (e) {
        res.status(500).json({error: e});
    }
});

export default router;
