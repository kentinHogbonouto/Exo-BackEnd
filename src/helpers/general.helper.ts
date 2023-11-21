import fs from "fs";
import path from "path";

import jwt from "jsonwebtoken";

import { Pagination } from "../interfaces/pagination.interface";
import { TokenPayload } from "../interfaces/token-payload.interface";

import EnvironmentConfigs from "../configs/environments";

export default class GeneralHelpers {
  /**
   * @function getPage
   * @description Get pagination data.
   * @param data The data
   * @param currentPage The current page
   * @param perPage The number of elements to return per page
   * @param totalElements The total elements in the model
   * @return Pagination
   */
  public static getPage(
    data: any[],
    currentPage: number,
    perPage: number,
    totalElements: number
  ): Pagination {
    perPage = perPage === -1 ? totalElements : perPage;

    const page: Pagination = {
      items: data,
      perPage,
      totalElements,
      currentPage,
      hasPreviousPage: currentPage > 1,
      previousPage: currentPage - 1,
      hasNextPage: perPage * currentPage < totalElements,
      nextPage: currentPage + 1,
      totalPages: Math.abs(Math.ceil(totalElements / perPage)),
    };

    return page;
  }

  /**
   * @function generateUserToken
   * @description Generate JWt Token for user.
   * @param payload The token payload
   * @return string
   */
  public static generateUserToken(payload: TokenPayload): string {
    const secret = fs.readFileSync(
      path.join(__dirname, "..", "configs", "certs", "user", "private.pem")
    );

    return jwt.sign(payload, secret, {
      algorithm: EnvironmentConfigs.getJwtTokenAlgorithm(),
      expiresIn: EnvironmentConfigs.getJwtTokenDuration(),
    } as any);
  }

  /**
   * @function generateUserRefreshToken
   * @description Generate JWt refresh Token for user.
   * @param payload The token payload
   * @return string
   */
  public static generateUserRefreshToken(payload: TokenPayload): string {
    const secret = fs.readFileSync(
      path.join(__dirname, "..", "configs", "certs", "user", "private.pem")
    );

    return jwt.sign(payload, secret, {
      algorithm: EnvironmentConfigs.getJwtTokenAlgorithm(),
      expiresIn: EnvironmentConfigs.getJwtRefreshTokenDuration(),
    } as any);
  }
}
