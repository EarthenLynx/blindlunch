const winston = require('winston');

const authLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './store/logs/auth.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  authLogger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Log basic stuff for each request that comes into the middleware
const authLog = (req, res, next) => {
  const ip = req.ip;
  const url = req.originalUrl;
  const protocol = req.protocol;
  const method = req.method;

  if (method === "POST") {
    authLogger.log('info', `${ip}: ${protocol} - ${method} - Authentication attempt at ${url}`)
  } else {
    logger.log('info', `${ip}: ${protocol} - ${method} - Login attempt at ${url}`)
  }
  next();
}

// Log errors during the authentication process
const authErrorLog = (ip, httpStatus, msg) => {
  authLogger.log('info', `${ip}: http status ${httpStatus} error: ${msg}`)
}

module.exports = { authLog, authErrorLog } 