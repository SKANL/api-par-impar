/**
 * Configuración del servidor
 */
class ServerConfig {
  constructor() {
    this.port = process.env.PORT || 8443;
    this.host = process.env.HOST || 'localhost';
    this.nodeEnv = process.env.NODE_ENV || 'development';
    this.apiPrefix = process.env.API_PREFIX || '/api';
    this.corsOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['https://localhost:3000'];
  }

  /**
   * Obtiene la configuración del servidor
   * @returns {Object}
   */
  getConfig() {
    return {
      port: this.port,
      host: this.host,
      nodeEnv: this.nodeEnv,
      apiPrefix: this.apiPrefix,
      corsOrigins: this.corsOrigins,
      isDevelopment: this.nodeEnv === 'development',
      isProduction: this.nodeEnv === 'production'
    };
  }

  /**
   * Obtiene la URL base del servidor
   * @returns {string}
   */
  getBaseUrl() {
    return `https://${this.host}:${this.port}`;
  }

  /**
   * Valida la configuración
   * @returns {boolean}
   */
  validate() {
    const errors = [];

    if (!this.port || isNaN(this.port) || this.port < 1 || this.port > 65535) {
      errors.push('Invalid port number');
    }

    if (!this.host) {
      errors.push('Host is required');
    }

    if (errors.length > 0) {
      throw new Error(`Server configuration errors: ${errors.join(', ')}`);
    }

    return true;
  }
}

/**
 * Factory function para crear la configuración del servidor
 * @returns {Object}
 */
function createServerConfig() {
  const serverConfig = new ServerConfig();
  serverConfig.validate();
  return serverConfig.getConfig();
}

module.exports = { 
  ServerConfig, 
  createServerConfig 
};
