import { Request, Response, NextFunction, Router } from "express";

import { body } from "express-validator";

import EnvironmentConfigs from "../../../../configs/environments";

import { ValidationMessages } from "../../../../validations/validation";

import UserController from "../controllers/user.controller";

export default function UserRoutes(userController: UserController) {
  const router = Router();

  /**
   * @swaggers
   * tags:
   *   name: User Management
   */

  /**
   * @swagger
   * /api/v1/users/list:
   *   get:
   *     parameters:
   *       - name: page
   *         in: query
   *         required: false
   *         schema:
   *           type: number
   *       - name: pageSize
   *         in: query
   *         required: false
   *         schema:
   *           type: number
   *     summary: Récupérer la liste des utilisateurs.
   *     tags: [User Management]
   *     responses:
   *       200:
   *         description: User list successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: user successfully found.
   *       401:
   *         description: You have not authenticated.
   *       404:
   *         description: User not found.
   *       500:
   *         description: Erreur server
   */
  router.get("/list", (req: Request, res: Response, next: NextFunction) =>
    userController.findAll(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Récupérer les données du compte d'un utilisateur par son id.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       200:
   *         description: User successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: user successfully found.
   *       401:
   *         description: Unauthorized.
   *       404:
   *         description: user not found.
   *       500:
   *         description: Erreur server
   */
  router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    userController.findOne(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/private:
   *   get:
   *     security:
   *       - bearerAuth: []
   *     summary: Verifier l'authentification.
   *     tags: [User Management]
   *     responses:
   *       200:
   *         description: User successfully found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: user successfully found.
   *       401:
   *         description: Unauthorized.
   *       404:
   *         description: user not found.
   *       500:
   *         description: Erreur server
   */
  router.get("/", (req: Request, res: Response, next: NextFunction) =>
    userController.private(req, res, next)
  );

  /**
   * @swagger
   * /api/v1/users/create:
   *   post:
   *     summary: Créer le compte d'un utilisateur.
   *     tags: [User Management]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstname:
   *                 type: string
   *                 example: John.Doe
   *                 required: true
   *               lastname:
   *                 type: string
   *                 example: doe
   *                 reqired: true
   *               email:
   *                 type: string
   *                 example: john@doe.com
   *                 required: true
   *               password:
   *                 type: string
   *                 example: 1234567890@#
   *                 required: true
   *               confirmPassword:
   *                 type: string
   *                 example: 1234567890@#
   *                 required: true
   *     responses:
   *       201:
   *         description: User successfully created.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: User successfully created.
   *       401:
   *         description: You have not authenticated.
   *       404:
   *         description: Role not found
   *       422:
   *         description: Erreur de validation des champs.
   *       500:
   *         description: Erreur server
   */
  router.post(
    "/create",
    [
      body(["lastname", "firstname"]).not().isEmpty().withMessage({
        message: ValidationMessages.FIELD_REQUIRED,
        errorCode: 0,
      }),
      body("email")
        .not()
        .isEmpty()
        .withMessage({
          message: ValidationMessages.FIELD_REQUIRED,
          errorCode: 0,
        })
        .isEmail()
        .withMessage({
          message: ValidationMessages.INVALID_EMAIL_ADDRESS,
          errorCode: 8,
        })
        .normalizeEmail({ gmail_remove_dots: false }),
      body("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage({
          message: ValidationMessages.FIELD_REQUIRED,
          errorCode: 0,
        })
        .isLength({ min: EnvironmentConfigs.getPasswordMinLength() })
        .withMessage({
          message: ValidationMessages.lengthConstraintsFailed({
            min: EnvironmentConfigs.getPasswordMinLength(),
          }),
          errorCode: 3,
        }),
      body("confirmPassword")
        .trim()
        .not()
        .isEmpty()
        .withMessage({
          message: ValidationMessages.FIELD_REQUIRED,
          errorCode: 0,
        })
        .custom((value, { req }) =>
          ValidationMessages.isPasswordConfirmationMatch(
            value,
            req.body.password
          )
        ),
    ],
    (req: Request, res: Response, next: NextFunction) => {
      userController.create(req, res, next);
    }
  );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Mettre à jour le compte d'un utilisateur.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstname:
   *                 type: string
   *                 example: John
   *               lastname:
   *                 type: string
   *                 example: John
   *               email:
   *                 type: string
   *                 example: John@description.com
   *     responses:
   *       201:
   *         description: User successfully updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: User successfully updated.
   *       401:
   *         description: You have not authenticated.
   *       403:
   *         description: Email address already in use.
   *       422:
   *         description: Erreur de validation des champs.
   *       500:
   *         description: Erreur server
   */
  router.put(
    "/:id",
    [body(["firstName", "lastName", "email"]).optional({ nullable: true })],
    (req: Request, res: Response, next: NextFunction) => {
      userController.update(req, res, next);
    }
  );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   patch:
   *     summary: Mettre à jour le compte d'un utilisateur.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstname:
   *                 type: string
   *                 example: John
   *               lastname:
   *                 type: string
   *                 example: John
   *               email:
   *                 type: string
   *                 example: John@description.com
   *     responses:
   *       201:
   *         description: User successfully updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   *                  success:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                    type: string
   *                    example: User successfully updated.
   *       401:
   *         description: You have not authenticated.
   *       403:
   *         description: Email address already in use.
   *       422:
   *         description: Erreur de validation des champs.
   *       500:
   *         description: Erreur server
   */
  router.patch(
    "/:id",
    [body(["firstName", "lastName", "email"]).optional({ nullable: true })],
    (req: Request, res: Response, next: NextFunction) => {
      userController.update(req, res, next);
    }
  );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Supprimer un utilisateur.
   *     tags: [User Management]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: User successfully delete
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       403:
   *         description: Vous n'ête pas autorisé à effectuer cette action
   *       404:
   *         description: chef introuvable
   *       500:
   *         description: Erreur serveur
   */
  router.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    userController.delete(req, res, next)
  );

  return router;
}
