import { Request, Response, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";

import ApiResponses from "../../../../helpers/api-responses.helper";

import UserService from "../services/user.service";

export default class UserController {
  constructor(private userService: UserService) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      let users: any = await this.userService.findAll();

      res
        .status(200)
        .json(ApiResponses.success(users, "Users list successfully found."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req?.params;
      let user: any = await this.userService.findOne(id);

      res
        .status(200)
        .json(ApiResponses.success(user, "User successfully found."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstname, lastname, email, password } = req?.body;

      let user: any = await this.userService.create(
        firstname,
        lastname,
        email,
        password
      );

      res
        .status(200)
        .json(ApiResponses.success(user, "User successfully created."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async private(req: JWTRequest, res: Response, next: NextFunction) {
    try {
      const sub: any = req.auth;

      console.log("sub: ", sub);
      
      let user: any = await this.userService.private(sub.userId);

      res
        .status(200)
        .json(ApiResponses.success(user, "authenticated user found."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req?.params;
      const { firstname, lastname, email } = req?.body;

      let user: any = await this.userService.update(
        firstname,
        lastname,
        email,
        id
      );

      res
        .status(200)
        .json(ApiResponses.success(user, "User successfully updated."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async updatePartial(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req?.params;
      const { firstname, lastname, email } = req?.body;

      let user: any = await this.userService.updatedPartial(
        firstname,
        lastname,
        email,
        id
      );

      res
        .status(200)
        .json(ApiResponses.success(user, "User successfully updated."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req?.params;

      let user: any = await this.userService.delete(id);

      res
        .status(200)
        .json(ApiResponses.success(user, "User successfully deleted."));
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
}
