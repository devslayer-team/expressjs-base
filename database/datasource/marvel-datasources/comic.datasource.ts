import { Comic } from "@/models/comic.model";
import ComicDatasource from "../abstract-datasources/comic.datasource";
import axios from "axios";
import { ComicModel } from "@/database/models/comic.model";

class ComicDatasourceImpl implements ComicDatasource {
  async getAllComics(): Promise<ComicModel[]> {
    try {
      const allComics = await axios({
        method: "get",
        url: "https://gateway.marvel.com/v1/public/comics/107669?ts=1&apikey=1a0671e3d28eb43635377754f0572915&hash=a2b08b72060432c20ab8c14a82a2ad72",
      });
      const res: ComicModel[] = allComics.data.data.results.map((result: any) =>
        ComicModel.fromJSON(result)
      );
      return res;
      //   throw new Error(error.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  addComic(comic: ComicModel): Promise<ComicModel> {
    throw new Error("error.message");
  }
}

export default ComicDatasourceImpl;
