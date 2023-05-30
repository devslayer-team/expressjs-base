import { characterModel } from "@/database/models/character.model";

export default abstract class CharacterDatasource {
  abstract getCharacters(limit: number): Promise<characterModel[]>;
  abstract getCharacterById(id: string): Promise<characterModel>;
}
