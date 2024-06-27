// src/helpers/logger.helper.ts
import { LoggerColors } from "../interfaces/logger.interface";

class Logger {

    // Returns the color code for the logger
    public static colorCode(color: LoggerColors): number {
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

    // Logs a message to the console
    public static log(color: LoggerColors, title: string, message: string): void {
        const dateObject = new Date(); // Create a new date object
        const timeStamp = dateObject.getTime(); // Get the timestamp of the date object
        const formattedTime = dateObject.toISOString().slice(0, 19).replace("T", " "); // Format the date object to a string

        // Log the message to the console
        console.log("[%s] \x1b[1;%sm[%s]\x1b[0m", formattedTime, this.colorCode(color), title, message);
    }
}

export default Logger;