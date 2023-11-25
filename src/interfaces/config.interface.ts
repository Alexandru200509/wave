// src/interfaces/config.interface.ts
interface ConfigInterface{
    debug: boolean;
    host: string;
    port: number;
    logs: boolean;
    rateLimiter: RateLimiterInterface;
}

interface RateLimiterInterface {
    max: number;
    retries: number;
    timeout: number;
}

export {
    ConfigInterface,
    RateLimiterInterface
};