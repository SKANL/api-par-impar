const https = require('https');
const { createServerConfig } = require('../config/server.config');

/**
 * Clase para configurar y gestionar el servidor HTTPS
 */
class Server {
  constructor(app, sslOptions) {
    this.app = app;
    this.sslOptions = sslOptions;
    this.serverConfig = createServerConfig();
    this.server = null;
  }

  /**
   * Inicia el servidor HTTPS
   * @param {number} port - Puerto del servidor (opcional)
   */
  start(port = null) {
    const serverPort = port || this.serverConfig.port;
    
    try {
      this.server = https.createServer(this.sslOptions, this.app);
      
      this.server.listen(serverPort, () => {
        console.log('🚀 =====================================');
        console.log('🔒 HTTPS Server Started Successfully');
        console.log('🚀 =====================================');
        console.log(`📍 URL: https://${this.serverConfig.host}:${serverPort}`);
        console.log(`🌍 Environment: ${this.serverConfig.nodeEnv}`);
        console.log(`🔧 API Prefix: ${this.serverConfig.apiPrefix}`);
        console.log('🚀 =====================================');
        
        if (this.serverConfig.isDevelopment) {
          this.printAvailableEndpoints(serverPort);
        }
      });

      this.server.on('error', (error) => {
        console.error('❌ Server error:', error);
        if (error.code === 'EADDRINUSE') {
          console.error(`❌ Port ${serverPort} is already in use`);
        }
        process.exit(1);
      });

      // Manejo graceful shutdown
      this.setupGracefulShutdown();

    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  /**
   * Imprime los endpoints disponibles (solo en desarrollo)
   */
  printAvailableEndpoints(port) {
    const baseUrl = `https://localhost:${port}`;
    console.log('\n📋 Available Endpoints:');
    console.log('📋 =====================================');
    console.log(`🏠 Health Check: ${baseUrl}/api/parity/health`);
    console.log(`📊 Check Parity (POST): ${baseUrl}/api/parity/check`);
    console.log(`📊 Check Parity (GET): ${baseUrl}/api/parity/check-query?number=5`);
    console.log(`📜 History: ${baseUrl}/api/parity/history`);
    console.log(`📈 Statistics: ${baseUrl}/api/parity/stats`);
    console.log(`🏠 Root: ${baseUrl}/`);
    console.log('📋 =====================================\n');
  }

  /**
   * Configura el shutdown graceful
   */
  setupGracefulShutdown() {
    const shutdown = (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      
      if (this.server) {
        this.server.close((err) => {
          if (err) {
            console.error('❌ Error during server shutdown:', err);
            process.exit(1);
          }
          console.log('✅ Server closed successfully');
          process.exit(0);
        });

        // Force close after 10 seconds
        setTimeout(() => {
          console.error('❌ Forcing shutdown...');
          process.exit(1);
        }, 10000);
      } else {
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }

  /**
   * Detiene el servidor
   */
  stop() {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }

  /**
   * Obtiene información del servidor
   */
  getInfo() {
    return {
      isRunning: this.server !== null,
      config: this.serverConfig
    };
  }
}

module.exports = { Server };
