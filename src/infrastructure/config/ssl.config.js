const fs = require('fs');
const path = require('path');
const selfsigned = require('selfsigned');

/**
 * Configuración SSL para el servidor HTTPS
 */
class SSLConfig {
  constructor() {
    this.sslDir = path.join(process.cwd(), 'ssl');
    this.keyPath = path.join(this.sslDir, 'key.pem');
    this.certPath = path.join(this.sslDir, 'cert.pem');
  }

  /**
   * Crea el directorio SSL si no existe
   */
  ensureSSLDirectory() {
    if (!fs.existsSync(this.sslDir)) {
      fs.mkdirSync(this.sslDir, { recursive: true });
    }
  }

  /**
   * Genera certificados SSL autofirmados
   */
  generateSelfSignedCertificates() {
    console.log('Generando certificados SSL autofirmados...');
    
    const attrs = [
      { name: 'commonName', value: 'localhost' },
      { name: 'countryName', value: 'ES' },
      { name: 'stateOrProvinceName', value: 'Madrid' },
      { name: 'localityName', value: 'Madrid' },
      { name: 'organizationName', value: 'Parity API' },
      { name: 'organizationalUnitName', value: 'Development' }
    ];

    const options = {
      days: 365,
      keySize: 2048,
      extensions: [
        {
          name: 'basicConstraints',
          cA: true
        },
        {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        },
        {
          name: 'subjectAltName',
          altNames: [
            {
              type: 2, // DNS
              value: 'localhost'
            },
            {
              type: 7, // IP
              ip: '127.0.0.1'
            }
          ]
        }
      ]
    };

    const pems = selfsigned.generate(attrs, options);
    
    fs.writeFileSync(this.keyPath, pems.private);
    fs.writeFileSync(this.certPath, pems.cert);
    
    console.log('✅ Certificados SSL generados exitosamente');
  }

  /**
   * Carga los certificados SSL
   * @returns {Object} Opciones SSL para el servidor HTTPS
   */
  loadCertificates() {
    this.ensureSSLDirectory();

    let key, cert;

    if (!fs.existsSync(this.keyPath) || !fs.existsSync(this.certPath)) {
      this.generateSelfSignedCertificates();
    }

    try {
      key = fs.readFileSync(this.keyPath, 'utf8');
      cert = fs.readFileSync(this.certPath, 'utf8');
      
      console.log('✅ Certificados SSL cargados exitosamente');
    } catch (error) {
      console.error('❌ Error al cargar certificados SSL:', error);
      throw new Error('Failed to load SSL certificates');
    }

    return { key, cert };
  }

  /**
   * Verifica si los certificados son válidos
   * @returns {boolean}
   */
  validateCertificates() {
    try {
      if (!fs.existsSync(this.keyPath) || !fs.existsSync(this.certPath)) {
        return false;
      }

      const key = fs.readFileSync(this.keyPath, 'utf8');
      const cert = fs.readFileSync(this.certPath, 'utf8');

      // Verificaciones básicas
      return key.includes('-----BEGIN PRIVATE KEY-----') && 
             cert.includes('-----BEGIN CERTIFICATE-----');
    } catch (error) {
      return false;
    }
  }
}

/**
 * Factory function para crear la configuración SSL
 * @returns {Object} Opciones SSL
 */
function createSSLConfig() {
  const sslConfig = new SSLConfig();
  return sslConfig.loadCertificates();
}

module.exports = { 
  SSLConfig, 
  createSSLConfig 
};
