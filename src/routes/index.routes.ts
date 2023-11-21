import { Router } from "express";

import UserRoutes from "../api/v1/user/routes/user.routes";
import UserController from "../api/v1/user/controllers/user.controller";
import UserService from "../api/v1/user/services/user.service";

import AuthRoutes from "../api/v1/auth/routes/auth.routes";
import AuthController from "../api/v1/auth/controllers/auth.controller";
import AuthService from "../api/v1/auth/services/auth.service";

/**
 * @description Configured router for serving Routes
 * @exports router
 * @default
 */
export default function AllRoutes() {
  const router: Router = Router();

  router.use("/v1/auth", AuthRoutes(new AuthController(new AuthService())));

  router.use("/v1/users", UserRoutes(new UserController(new UserService())));
  router.use("/v1/private", UserRoutes(new UserController(new UserService())));

  return router;
}

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       required:
 *         - lastname
 *         - firstname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *         lastname:
 *           type: string
 *         firstname:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
