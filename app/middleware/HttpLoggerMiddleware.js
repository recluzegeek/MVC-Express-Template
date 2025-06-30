import logger from '../utils/Logger.js';

export const httpLogger = (req, res, next) => {
  const start = process.hrtime.bigint();

  // ---- Log Incoming Request ----

  const requestMeta = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    host: req.hostname,
    protocol: req.protocol,
    userAgent: req.headers['user-agent'],
    referrrer: req.headers['referrer'] || req.headers['referer'] || 'N/A',
    params: req.params,
    query: req.query,
    body: req.body,
    // headers: req.headers,
    timestamp: new Date().toISOString(),
  };

  logger.info(
    `Incoming Request: ${req.method} ${req.originalUrl} ${JSON.stringify(requestMeta, null, 2)}`
  );

  // ---- Log Outgoing Response ----

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000; // nanoseconds => miliseconds conversion

    const responseMeta = {
      ...requestMeta,
      status: res.statusCode,
      responseTime: `${durationMs} ms`,
      contentLength: res.getHeader('content-length') || 0,
    };

    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'http';

    const logMessage = `Outgoing Response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${durationMs} ms`;
    logger.log(level, `${logMessage}, ${JSON.stringify(responseMeta, null, 2)}`);
  });

  next();
};
