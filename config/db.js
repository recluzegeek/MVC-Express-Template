import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import Debug from 'debug';
import dotenv from 'dotenv';
const debug = Debug("myapp:app");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    storage: "./habbits-db",
    logging: msg => debug(chalk.yellow(msg))
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate()
    debug(chalk.green('Connection has been established successfully!'));
    await sequelize.sync({ force: false });
    debug(chalk.green('Database table created succesfully!'));
  } catch (error) {
    debug(chalk.red('ERORR: Unable to connect to datbase', error));
    process.exit(1);
  }
}


process.on('SIGINT', async () => {
  try {
    await sequelize.close()
    debug(chalk.yellow('Sequelize connection closed due to app termination.'))
  } catch (error) {
    debug(chalk.red('Error closing Sequelize connection: '), error);
  }
});

export { sequelize, connectToDB };
