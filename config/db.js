import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../app/utils/Logger.js";

// const debug = Debug('myapp:db');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    storage: "./habits-db",
    logging: (msg) => logger.verbose(msg),
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully!");
    await sequelize.sync({ force: false });
    logger.info("Database table created succesfully!");
  } catch (error) {
    logger.error("ERORR: Unable to connect to datbase", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  try {
    await sequelize.close();
    logger.info("Sequelize connection closed due to app termination.");
  } catch (error) {
    logger.error(`Error closing Sequelize connection: ${error}`);
  }
});

export { sequelize, connectToDB };
