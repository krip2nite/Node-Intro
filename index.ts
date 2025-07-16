import Logger from "./Logger.ts";
import fs from "node:fs"
const logger = new Logger();
logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandlerLevel("debug", (message) => fs.writeFileSync("logs.txt", message + '\n', {flag: "a"}))
logger.log("debug", "kukureku");
