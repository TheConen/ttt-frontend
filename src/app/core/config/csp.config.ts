/**
 * Content Security Policy Configuration
 * Centralized configuration for all CSP directives
 */

export interface CSPConfig {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc: string[];
  fontSrc: string[];
  imgSrc: string[];
  connectSrc: string[];
  frameSrc: string[];
  childSrc: string[];
  frameAncestors: string[];
  baseUri: string[];
  formAction: string[];
  objectSrc: string[];
}

/**
 * Trusted external sources configuration
 * Add new trusted domains here for easy management
 */
export const TRUSTED_SOURCES = {
  // Google Services
  google: {
    fonts: 'https://fonts.googleapis.com',
    fontsStatic: 'https://fonts.gstatic.com'
  },
  
  // Discord Services
  discord: {
    main: 'https://discord.com',
    cdn: 'https://cdn.discordapp.com',
    assets: 'https://*.discordapp.com',
    gateway: 'wss://gateway.discord.gg'
  },
  
  // Add future trusted sources here
  // example: {
  //   main: 'https://example.com',
  //   api: 'https://api.example.com'
  // }
} as const;

/**
 * Content Security Policy configuration
 * Modify this object to add or remove CSP directives
 */
export const CSP_CONFIG: CSPConfig = {
  defaultSrc: ["'self'"],
  
  scriptSrc: [
    "'self'",
    "'unsafe-eval'", // Required for Angular in development
    "'unsafe-inline'", // Required for Angular in development
    TRUSTED_SOURCES.discord.main
  ],
  
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // Required for Angular and PrimeNG
    TRUSTED_SOURCES.google.fonts,
    TRUSTED_SOURCES.discord.main
  ],
  
  fontSrc: [
    "'self'",
    TRUSTED_SOURCES.google.fontsStatic,
    TRUSTED_SOURCES.discord.main
  ],
  
  imgSrc: [
    "'self'",
    "data:",
    "blob:",
    TRUSTED_SOURCES.discord.main,
    TRUSTED_SOURCES.discord.cdn,
    TRUSTED_SOURCES.discord.assets
  ],
  
  connectSrc: [
    "'self'",
    "ws:",
    "wss:",
    TRUSTED_SOURCES.discord.main,
    TRUSTED_SOURCES.discord.gateway
  ],
  
  frameSrc: [
    "'self'",
    TRUSTED_SOURCES.discord.main
  ],
  
  childSrc: [
    "'self'",
    TRUSTED_SOURCES.discord.main
  ],
  
  frameAncestors: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  objectSrc: ["'none'"]
};

/**
 * Generates CSP string from configuration
 * @param config CSP configuration object
 * @returns CSP directive string
 */
export function generateCSPString(config: CSPConfig): string {
  const directives = [
    `default-src ${config.defaultSrc.join(' ')}`,
    `script-src ${config.scriptSrc.join(' ')}`,
    `style-src ${config.styleSrc.join(' ')}`,
    `font-src ${config.fontSrc.join(' ')}`,
    `img-src ${config.imgSrc.join(' ')}`,
    `connect-src ${config.connectSrc.join(' ')}`,
    `frame-src ${config.frameSrc.join(' ')}`,
    `child-src ${config.childSrc.join(' ')}`,
    `frame-ancestors ${config.frameAncestors.join(' ')}`,
    `base-uri ${config.baseUri.join(' ')}`,
    `form-action ${config.formAction.join(' ')}`,
    `object-src ${config.objectSrc.join(' ')}`
  ];
  
  return directives.join('; ') + ';';
}

/**
 * Production CSP configuration with stricter rules
 * Use this for production builds
 */
export const PRODUCTION_CSP_CONFIG: Partial<CSPConfig> = {
  scriptSrc: [
    "'self'",
    // Remove unsafe-eval and unsafe-inline in production
    TRUSTED_SOURCES.discord.main
  ],
  
  styleSrc: [
    "'self'",
    "'sha256-hash'", // Replace with actual hash of inline styles
    TRUSTED_SOURCES.google.fonts,
    TRUSTED_SOURCES.discord.main
  ]
};

/**
 * Helper function to add new trusted source
 * @param name Source name
 * @param domains Array of domains for this source
 */
export function addTrustedSource(name: string, domains: string[]) {
  // This is a helper for runtime addition if needed
  // In practice, you would modify TRUSTED_SOURCES directly
  console.log(`Adding trusted source ${name}:`, domains);
}