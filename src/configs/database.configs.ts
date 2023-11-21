import { Sequelize } from "sequelize";

import EnvironmentConfigs from "./environments";

export default class DatabaseConfigs {
  static async init(): Promise<void> {
    /**
     * @descritpion Initiate the connection to the database
     */

    const sequelize = new Sequelize(
      EnvironmentConfigs.getDatabaseValue().databasename,
      EnvironmentConfigs.getDatabaseValue().username,
      EnvironmentConfigs.getDatabaseValue().password,
      {
        host: "localhost",
        dialect: "mysql",
      }
    );

    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    
  }
}
