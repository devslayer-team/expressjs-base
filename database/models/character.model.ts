import { Character } from "@/models/character.model";
import { Document } from "mongoose";

export class characterModel {
  public character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  toJSON(): any {
    const { id, name, description, thumbnail } = this.character;
    return { id, name, description, thumbnail };
  }

  static fromJSON(json: any): characterModel {
    const characterDocument: Character = json as Character;
    return new characterModel(characterDocument);
  }
}
