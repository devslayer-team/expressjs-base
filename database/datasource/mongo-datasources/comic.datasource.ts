import { Extension } from "@/models/base.model";
import ComicDatasource from "../abstract-datasources/comic.datasource";
import MongoComicModel from "./models/comic.model";
import { ComicModel } from "@/database/models/comic.model";

export class ComicDatasourceImpl implements ComicDatasource {
  async addComic(comicModel: ComicModel): Promise<ComicModel> {
    try {
      const comic = comicModel.comic;
      const newComic = new MongoComicModel({
        creators: comic.creators,
        comments: comic.comments,
        modified: comic.modified,
        comicID: comic.id,
        title: comic.title,
        description: comic.description,
        thumbnail: comic.thumbnail,
      });
      const newComicResult = await newComic.save();
      return comicModel;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAllComics(): Promise<ComicModel[]> {
    try {
      const allComics = await MongoComicModel.find();
      return allComics.map((comic) => {
        const comics: ComicModel = ComicModel.fromJSON(comic);
        return comics;
      });
      // throw new Error(error.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
