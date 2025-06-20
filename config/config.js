const env = process.env.NODE_ENV || 'development';
const isAtlas = process.env.DB_ATLAS || false;

const config = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.APP_HOSTNAME || 'localhost',
    },
    database: {
    // url: `mongodb+srv://${process.env.DB_HOST || 'localhost'}:${process.env.DB_HOST || 27017}/${process.env.DB_NAME}`,
    url: isAtlas
            ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
            : `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME}`
    },
  },
  production: {
    server: {
      port: process.env.PORT || 3200,
      hostname: process.env.APP_HOSTNAME || 'localhost',
    },
    database: {
      // url: `mongodb+srv://${process.env.DB_HOST || 'localhost'}:${process.env.DB_HOST || 27017}/${process.env.DB_NAME}`,
      url: isAtlas
          ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
          : `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME}`
    },
  },
};
config[env].isDev = env === 'development';
config[env].isProd = env === 'production';

export default config[env];
