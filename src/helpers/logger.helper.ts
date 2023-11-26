import { LoggerColors } from "../interfaces/logger.interface";

class Logger {
    public static colorCode(color: LoggerColors) {
        switch (color) {
            case "red":
                return 31;
            case "green":
                return 32;
            case "yellow":
                return 33;
            case "blue":
                return 34;
            case "magenta":
                return 35;
            case "cyan":
                return 36;
            case "white":
                return 37;
            case "black":
                return 30;
        }
    }

    public static log(color: LoggerColors, title: string, message: string) {
        const dateObject = new Date();
        const timeStamp = dateObject.getTime();
        const formattedTime = dateObject.toISOString().slice(0, 19).replace("T", " ");

        console.log("[%s] \x1b[1;%sm[%s]\x1b[0m", formattedTime, this.colorCode(color), title, message);
    }
}

export default Logger;