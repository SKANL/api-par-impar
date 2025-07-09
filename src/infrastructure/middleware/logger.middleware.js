/**
 * Middleware para logging de requests
 */
function loggerMiddleware(req, res, next) {
  const start = Date.now();
  
  // Log del request entrante
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);
  
  // Override del método end para capturar la respuesta
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    originalEnd.call(this, chunk, encoding);
  };

  next();
}

/**
 * Middleware para logging detallado (solo en desarrollo)
 */
function detailedLoggerMiddleware(req, res, next) {
  const start = Date.now();
  
  console.log('--- Request Details ---');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
  }
  console.log('----------------------');

  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    console.log('--- Response Details ---');
    console.log(`Status: ${res.statusCode}`);
    console.log(`Duration: ${duration}ms`);
    console.log('-----------------------');
    originalEnd.call(this, chunk, encoding);
  };

  next();
}

module.exports = { 
  loggerMiddleware, 
  detailedLoggerMiddleware 
};
