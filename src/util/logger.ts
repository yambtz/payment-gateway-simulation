import { Logger, LoggerOptions, transports } from 'winston';
import config from '../config';

const logLevel = config.logLevel;

const options: LoggerOptions = {
    transports: [
        new transports.Console({
            level: logLevel,
        }),
    ],
};

const logger = new Logger(options);

logger.debug(`Logging initialized at ${logLevel} level`);

export default logger;
