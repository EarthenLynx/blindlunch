const winston = require('winston');

const authLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './store/logs/auth.log' }),
  ],
});
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
    authLogger.log('info', `${ip}: ${protocol} - ${method} - Login attempt at ${url}`)
  }
  next();
}

// Log errors during the authentication process
const authErrorLog = (ip, httpStatus, msg) => {
  authLogger.log('info', `${ip}: http status ${httpStatus} error: ${msg}`)
}

module.exports = { authLog, authErrorLog } 