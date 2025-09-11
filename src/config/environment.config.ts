export const environmentConfig = () => ({
  server: {
    port: Number(process.env.PORT || 3000),
    prefix: process.env.GLOBAL_PREFIX || 'api',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  documentation: {
    swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
  },
});
