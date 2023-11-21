import createHttpError from "http-errors";

import PasswordHelpers from "../../../../helpers/password.helper";
import GeneralHelpers from "../../../../helpers/general.helper";

import { UserType } from "../../../../interfaces/token-payload.interface";

import { AuthValidationMessages } from "../validations/auth.validation";
import User from "../../../../models/user";

export default class AuthService {
  constructor() {}

  public async authenticate(email: string, password: string): Promise<any> {
    let token = "";
    let refreshToken = "";

    let user: any = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INCORRECT_IDENTIFIER
      );
    }

    if (!user?.password) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INCORRECT_PASSWORD
      );
    }

    const isEqual = await PasswordHelpers.comparePasswords(
      password,
      user?.password
    );

    if (!isEqual) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INCORRECT_PASSWORD
      );
    }

    if (user?.enable === false || 0) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INVALID_ACCOUNT
      );
    }

    token = GeneralHelpers.generateUserToken({
      userId: user?.id,
      userType: UserType?.USER,
    });

    refreshToken = GeneralHelpers.generateUserRefreshToken({
      userId: user?.id,
      userType: UserType?.USER,
    });

    return {
      token,
      refreshToken,
      expireIn: 24,
    };
  }
}
