import Logger from "./Logger.ts";
import fs from "node:fs"
const logger = new Logger();
logger.addHandlerMessage((obj) => console.log(obj.level.toUpperCase(), obj.message));
logger.log("info", "kukureku");
logger.log("info", "again kukureku");
