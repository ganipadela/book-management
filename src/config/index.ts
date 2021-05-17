const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET || 'bookmanagement',
};

export default config;
