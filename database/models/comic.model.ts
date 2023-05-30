import { Comic } from "@/models/comic.model";
import { Document } from "mongoose";

export class ComicModel {
  public comic: Comic;

  constructor(comic: Comic) {
    this.comic = comic;
  }

  toJSON(): any {
    const { id, title, description, thumbnail, comments, creators, modified } =
      this.comic;
    return { id, title, description, thumbnail, comments, creators, modified };
  }

  static fromJSON(json: any): ComicModel {
    const comicDocument: Comic = json as Comic;
    return new ComicModel(comicDocument);
  }
}
