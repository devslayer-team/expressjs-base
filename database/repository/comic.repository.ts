import { Comic } from "@/models/comic.model";
import ComicDatasource from "../datasource/abstract-datasources/comic.datasource";
import { ComicModel } from "../models/comic.model";

class ComicRepository {
  public comicDatasource: ComicDatasource;

  constructor(comicDatasource: ComicDatasource) {
    this.comicDatasource = comicDatasource;
  }

  public getAllComics = async () => {
    return await this.comicDatasource.getAllComics();
  };

  public addComic = async (comic: ComicModel) => {
    return await this.comicDatasource.addComic(comic);
  };
}

export default ComicRepository;
