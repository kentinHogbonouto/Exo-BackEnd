import { Request, Response, NextFunction } from "express";

import ApiResponses from "../../../../helpers/api-responses.helper";

import AuthService from "../services/auth.service";

export default class AuthController {
  constructor(private authService: AuthService) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req?.body;

      let authenticatedUser: any = await this.authService.authenticate(
        email,
        password
      );

      res
        .status(200)
        .json(
          ApiResponses.success(authenticatedUser, "Succesfully authenticated.")
        );
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
}
