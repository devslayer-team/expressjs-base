import { Router } from "express";
import Controller from "@/controllers/controller.interface";
import ComicController from "./comic.controllers";
import { ComicServiceImpl } from "@/services/comic.services";
import CharacterController from "./character.controllers";
import { CharacterServiceImpl } from "@/services/character.services";
import UserController from "./user.controllers";
import { UserServiceImpl } from "@/services/user.services";

class RootController implements Controller {
  public path = "/api";
  public router = Router();

  constructor() {
    this.init([
      new ComicController(new ComicServiceImpl()),
      new CharacterController(new CharacterServiceImpl()),
      new UserController(new UserServiceImpl()),
    ]);
  }

  private init(controllers: Controller[]): void {
    controllers.forEach((controller) =>
      this.router.use(controller.path, controller.router)
    );
  }
}

export default RootController;
