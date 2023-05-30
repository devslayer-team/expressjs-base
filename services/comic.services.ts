import { ComicDatasourceImpl } from "@/database/datasource/mongo-datasources/comic.datasource";
import { ComicModel } from "@/database/models/comic.model";
import ComicRepository from "@/database/repository/comic.repository";
import { Extension } from "@/models/base.model";
import { Comic } from "@/models/comic.model";

export abstract class ComicService {
  abstract getAllComics(): Promise<ComicModel[]>;
  abstract addComic(data: any): Promise<ComicModel>;
}

// DI Solid
export class ComicServiceImpl implements ComicService {
  public repository: ComicRepository;

  constructor() {
    this.repository = new ComicRepository(new ComicDatasourceImpl());
  }
  addComic(data: any): Promise<ComicModel> {
    try {
      const comic = ComicModel.fromJSON(data);
      return this.repository.addComic(comic);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getAllComics(): Promise<ComicModel[]> {
    try {
      return new Promise<ComicModel[]>(async (resolve) => {
        const allComics = await this.repository.getAllComics();
        resolve(allComics);
      });
    } catch (e: unknown) {
      throw new Error("Error to get comic: " + e);
    }
  }
}
