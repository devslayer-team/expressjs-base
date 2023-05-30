import { ComicModel } from "@/database/models/comic.model";

abstract class ComicDatasource {
  abstract getAllComics(): Promise<ComicModel[]>;
  abstract addComic(comic: ComicModel): Promise<ComicModel>;
}

export default ComicDatasource;
