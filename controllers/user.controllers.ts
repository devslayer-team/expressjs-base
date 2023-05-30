import { UserService } from "@/services/user.services";
import { NextFunction, Request, Response, Router } from "express";
import Controller from "./controller.interface";
import { HttpException } from "@/interface";
import { authenticatedMiddleware } from "@/middlewares";

export default class UserController implements Controller {
  public path = "/user";
  public router = Router();
  public userService: UserService;

  constructor(userService: UserService) {
    this.initialiseRoutes();
    this.userService = userService;
  }

  private initialiseRoutes(): void {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.get("/find", authenticatedMiddleware, this.find);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.userService.register(
        req.body.email,
        req.body.password,
        req.body.userAvatar
      );
      res.status(200).send(user);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.userService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).send(user);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  private find = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.userService.find(req.body.email);
      res.status(200).send(user);
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };
}
