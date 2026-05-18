import fs from 'fs';
import winston, {format} from 'winston';
import 'winston-daily-rotate-file';
import env from './env';

const LOG_DIR = env.LOG_DIR;
const LOG_LEVEL = env.LOG_LEVEL;

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const consoleFormat = format.printf((info) => {
    const {
        timestamp,
        level,
        message,
        requestId,
        method,
        path,
        statusCode,
        durationMs,
        ip,
        userId,
        stack,
    } = info;

    if (method && path && durationMs !== undefined) {
        const user = userId ? ` user=${userId}` : '';
        return `${timestamp} ${level} ${method} ${path} ${statusCode} ${durationMs}ms rid=${requestId} ip=${ip}${user}`;
    }

    if (requestId) {
        return `${timestamp} ${level} ${message} rid=${requestId} ${method || ''} ${path || ''} ${statusCode || ''}`;
    }

    return `${timestamp} ${level} ${stack || message}`;
});

const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.errors({ stack: true })
    ),
    transports: [
        new winston.transports.Console({
            format: format.combine(format.colorize(), consoleFormat),
            level: LOG_LEVEL
        }),
        new winston.transports.DailyRotateFile({
            format: format.combine(format.json()),
            maxFiles: '14d',
            dirname: LOG_DIR,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: '%DATE%-log.log',
            level: LOG_LEVEL
        })
    ]
});

export default logger;
