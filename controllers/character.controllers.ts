import { HttpException } from "@/interface";
import Controller from "./controller.interface";
import { CharacterService } from "@/services/character.services";
import { NextFunction, Request, Response, Router } from "express";
import { authenticatedMiddleware } from "@/middlewares";

export default class CharacterController implements Controller {
  public path = "/characters";
  public router = Router();
  public characterService: CharacterService;

  constructor(characterService: CharacterService) {
    this.initialiseRoutes();
    this.characterService = characterService;
  }

  private initialiseRoutes(): void {
    this.router.post(
      "/:id/comment",
      authenticatedMiddleware,
      this.addCharacterComment
    );
    this.router.delete(
      "/:id/comment/:commentId",
      authenticatedMiddleware,
      this.deleteCharacterComment
    );

    this.router.get("/:id", this.getCharacterById);
    this.router.get("/", this.getCharacters);
  }

  private getCharacters = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const limit = 100;
      const characters = await this.characterService.getCharacters(limit);
      res.status(200).send(characters);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  private getCharacterById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const id = req.params.id;
      const character = await this.characterService.getCharacterById(id);
      res.status(200).send(character);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  private addCharacterComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      // console.log(req.body);
      const { characterId, text } = req.body;
      const userId = req.id;
      if (userId === null) next(new HttpException(401, "unauthenticated"));
      else {
        const comment = await this.characterService.addCharacterComment(
          userId,
          characterId,
          text
        );
        res.status(200).send(comment);
      }
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };

  private deleteCharacterComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      // console.log(req);
      const commentId = req.params.commentId;
      const userId = req.id;
      if (userId === null) next(new HttpException(401, "unauthenticated"));
      else {
        const deletedComment =
          await this.characterService.deleteCharacterComment(commentId);
        res.status(200).send(deletedComment);
      }
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };
}
