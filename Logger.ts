import EventEmitter from "events";
import config from "config";
type LogLevel = "severe" | "warn" | "info" | "debug" | "trace";

const logDef: {[level in LogLevel]: number} = {
  severe: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const CONFIG_LOG_LEVEL_NAME = "log_level";
const DEFAULT_CONFIG_LEVEL: LogLevel = "info";
class Logger extends EventEmitter{
    configLevel: LogLevel = DEFAULT_CONFIG_LEVEL;
    logWrongConfig = false;
    logConfigLevel = true;
    constructor() {
        super();
        if (config.has(CONFIG_LOG_LEVEL_NAME)) {
            this.configLevel =
                config.get<LogLevel>(CONFIG_LOG_LEVEL_NAME);
            if (!logDef[this.configLevel]) {
                this.logWrongConfig = true;
                this.configLevel = DEFAULT_CONFIG_LEVEL;
            }
        }

    }
    addHandlerLevel(level: LogLevel, handler: (message: string) => void): void {
        this.on(level, handler);
    }
    addHandlerMessage(
        handler: (obj: { level: LogLevel; message: string }) => void
    ): void {
        this.on("message", handler);
    }
    log(level: LogLevel, message: string): void {
        this.logWrongConfig && this.emitMessage(
            "warn",
            `config contains wrong log level, set to ${DEFAULT_CONFIG_LEVEL}`
        );
        this.logConfigLevel && this.emitMessage("info", `logger level is ${this.configLevel}`);
        this.emit(level, message);

        this.emitMessage(level, message);
        this.logWrongConfig = false;
        this.logConfigLevel = false;
    }

    private emitMessage(level: string, message: string) {
        if (logDef[level] <= logDef[this.configLevel]) {
            this.emit("message", { level, message });
        }
    }
}
export default Logger;