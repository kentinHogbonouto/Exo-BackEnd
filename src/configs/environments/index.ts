import dotenv from "dotenv";

dotenv.config();
export default class EnvironmentConfigs {
  static inProduction: boolean = process.env.NODE_ENV === "production";

  /**
   * @function getServerPort
   * @description Get server PORT.
   * @return number
   */
  static getServerPort(): number {
    return Number(process.env.PORT) || 3000;
  }

  /**
   * @function getDatabaseValue
   * @description Get the database VALUE.
   * @return object
   */
  static getDatabaseValue(): any {
    const BD_USERNAME: string | undefined =
      process.env.NODE_ENV === "production"
        ? process.env.EXO_BACKEND_MYSQL_DB_USERNAME
        : process.env.EXO_BACKEND_DEV_MYSQL_DB_USERNAME;

    const BD_PASSWORD: string | undefined =
      process.env.NODE_ENV === "production"
        ? process.env.EXO_BACKEND_MYSQL_DB_PASSWORD
        : process.env.EXO_BACKEND_DEV_MYSQL_DB_PASSWORD;

    const BD_NAME: string | undefined =
      process.env.NODE_ENV === "production"
        ? process.env.EXO_BACKEND_MYSQL_DB_NAME
        : process.env.EXO_BACKEND_DEV_MYSQL_DB_NAME;

    const BD_HOST: string | undefined =
      process.env.NODE_ENV === "production"
        ? process.env.EXO_BACKEND_MYSQL_DB_HOST
        : process.env.EXO_BACKEND_DEV_MYSQL_DB_HOST;

    return {
      username: BD_USERNAME,
      password: BD_PASSWORD,
      databasename: BD_NAME,
      host: BD_HOST,
    };
  }

  /**
   * @function getAppName
   * @description Get server app name.
   * @return string
   */
  static getAppName(): string {
    return process.env.EXO_BACKEND_APP_NAME || "Exo Backend";
  }

  /**
   * @function getServerURL
   * @description Get server app name.
   * @return string
   */
  static getServerURL(): string {
    return process.env.NODE_ENV === "production"
      ? process.env.EXO_BACKEND_SERVER_URL || ""
      : `http://localhost:${this.getServerPort()}`;
  }

  /**
   * @function serverStartedMessage
   * @description Get server started message.
   * @return string
   */
  static serverStartedMessage(): string {
    return `${this.getAppName()} server started on ${this.getServerURL()}`;
  }

  /**
   * @function getJwtTokenAlgorithm
   * @description Get Jwt algorithm used to generate the JWT token.
   * @return string[]
   */
  static getJwtTokenAlgorithm(): string[] {
    return (process.env.JWT_TOKEN_ALGORITHM as any) || [""];
  }

  /**
   * @function getJwtTokenDuration
   * @description Get Jwt duration.
   * @return string
   */
  static getJwtTokenDuration(): string {
    return process.env.JWT_TOKEN_DURATION || "744h";
  }

  /**
   * @function getJwtTokenDuration
   * @description Get Jwt duration.
   * @return string
   */
  static getJwtRefreshTokenDuration(): string {
    return "10000000h";
  }

  /**
   * @function getResetPasswordTokenDuration
   * @description Get the duration of reset password token in milliseconds. Default 1h
   * @return number
   */
  static getResetPasswordTokenDuration(): number {
    return (Number(process.env.RESET_PASSWORD_TOKEN_DURATION) || 3600) * 1000;
  }

  /**
   * @function getPaginationItemsPerPage
   * @description Get the number of items per that will be returned per page
   * @return number
   */
  static getPaginationItemsPerPage(): number {
    return Number(process.env.ITEMS_PER_PAGE) || 12;
  }

  /**
   * @function getPasswordMinLength
   * @description Get the minimum length required for passwords
   * @return number
   */
  static getPasswordMinLength(): number {
    return Number(process.env.PASSWORD_MIN_LENGTH) || 8;
  }

  /**
   * @function getAllowedCountryCodes
   * @description Get allowed country codes.
   * @return string[]
   */
  static getAllowedCountryCodes(): string[] {
    return ["FR"];
  }
}
