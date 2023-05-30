import { Base, Extension } from "./base.model";
import { Character } from "./character.model";
import { Comic } from "./comic.model";

export interface User {
  id: string;
  password: string;
  email: string;
  favorite?: {
    charactersList: Character[];
    comicsList: Comic[];
  };
  userAvatar: {
    path: string;
    extension: Extension;
  };
}
