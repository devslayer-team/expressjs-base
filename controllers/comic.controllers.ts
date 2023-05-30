import { Comic } from "@/models/comic.model";
import Controller from "@/controllers/controller.interface";
import { ComicService } from "@/services/comic.services";
import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "@/interface";

class ComicController implements Controller {
  public path = "/comics";
  public router = Router();
  public comicService: ComicService;

  constructor(comicService: ComicService) {
    this.initialiseRoutes();
    this.comicService = comicService;
  }

  private initialiseRoutes(): void {
    this.router.get("/", this.getAllComics);
    this.router.post("/", this.addComic);
  }

  private getAllComics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const allComics = await this.comicService.getAllComics();
      res.status(200).send(allComics);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  private addComic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newComic = await this.comicService.addComic(req.body);
      res.status(200).send(newComic);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };
}

export default ComicController;
