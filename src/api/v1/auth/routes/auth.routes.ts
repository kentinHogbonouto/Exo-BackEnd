import { Request, Response, NextFunction, Router } from "express";

import { body } from "express-validator";

import AuthController from "../controllers/auth.controller";

import EnvironmentConfigs from "../../../../configs/environments";

import { ValidationMessages } from "../../../../validations/validation";

export default function AuthRoutes(authController: AuthController) {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Auth
   */

  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: Auhtentifier un utilisateur.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: johndoe@gmail.com
   *               password:
   *                 type: string
   *                 example: 1234567890@#$
   *     responses:
   *       200:
   *         description: Succesfully authenticated!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      token:
   *                        type: string
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: Succesfully authenticated!
   *       403:
   *         description: Incorrect password / Incorrect username.
   *       422:
   *         description: Erreur de validation des champs.
   *       500:
   *         description: Erreur server
   */
  router.post("/login", (req: Request, res: Response, next: NextFunction) =>
    authController.login(req, res, next)
  );

  return router;
}
