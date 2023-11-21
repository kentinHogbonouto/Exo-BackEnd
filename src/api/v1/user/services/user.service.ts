import createHttpError from "http-errors";

import PasswordHelpers from "../../../../helpers/password.helper";
import GeneralHelpers from "../../../../helpers/general.helper";

import { UserType } from "../../../../interfaces/token-payload.interface";

import { UserValidationMessages } from "../validations/user.validation";
import User from "../../../../models/user";

export default class UserService {
  constructor() {}

  public async findAll(page: number, pageSize: number): Promise<any> {
    const limit = page;
    const offset = pageSize;

    console.log("offset: ", offset, " limit: ", limit);

    let users: any;
    if (page && pageSize) {
      users = await User.findAll({
        offset: Number(offset),
        limit: Number(limit),
      });
    }
    users = await User.findAll();

    const countDocuments = await User.count();

    if (users.length === 0) {
      throw new createHttpError.NotFound("Users not found.");
    }

    return {
      users,
      pageInfo: {
        totalItems: countDocuments,
        totalPages: Math.ceil(countDocuments / pageSize),
        currentPage: page,
        pageSize,
      },
    };
  }

  public async findOne(id: string): Promise<any> {
    let user: any = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new createHttpError.NotFound("User not found.");
    }

    return { user };
  }

  public async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> {
    let hashedPassword = await PasswordHelpers.hashPassword(password);

    let findUserByEmail: any = await User.findOne({
      where: { email },
    });

    if (findUserByEmail) {
      throw new createHttpError.Conflict(
        UserValidationMessages.EMAIL_ALREADY_EXISTS
      );
    }

    let user: any = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    let apiResponse = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };

    return { apiResponse };
  }

  public async private(id: string): Promise<any> {
    let findUserById: any = await User.findOne({
      where: { id },
    });

    return `Hello world ${findUserById?.firstName}`;
  }

  public async update(
    firstName: string,
    lastName: string,
    email: string,
    id: string
  ): Promise<any> {
    const user = await User.update(
      {
        firstName,
        lastName,
        id,
        email,
      },
      { where: { id }, returning: true }
    );

    if (!user) {
      throw new createHttpError.NotFound("User not found.");
    }

    return { user };
  }

  public async updatedPartial(
    email: string,
    firstName: string,
    lastName: string,
    id: string
  ): Promise<any> {
    let user: any = await User.update(
      {
        firstName,
        lastName,
        id,
        email,
      },
      {
        where: { id },
      }
    );

    if (!user) {
      throw new createHttpError.NotFound("User not found.");
    }

    return { user };
  }

  public async delete(id: string): Promise<any> {
    let user: any = await User.destroy({
      where: { id },
    });

    if (!user) {
      throw new createHttpError.NotFound("User not found.");
    }

    return { user };
  }
}
