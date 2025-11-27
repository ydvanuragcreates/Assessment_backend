const morgan = require('morgan');

// Custom token for response time
morgan.token('response-time-ms', (req, res) => {
  if (!req._startAt || !res._startAt) {
    return '';
  }
  const ms = (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;
  return ms.toFixed(2);
});

// Custom format
const logFormat = ':method :url :status :response-time-ms ms - :res[content-length]';

const logger = morgan(logFormat, {
  skip: (req, res) => process.env.NODE_ENV === 'test'
});

module.exports = logger;
