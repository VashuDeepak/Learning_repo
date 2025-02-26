import winston from 'winston';
import { config } from '../config/config';

const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

export class Logger {
    static info(message: string) {
        logger.info(message);
    }

    static error(message: string) {
        logger.error(message);
    }

    static debug(message: string) {
        logger.debug(message);
    }

    static warn(message: string) {
        logger.warn(message);
    }
}
