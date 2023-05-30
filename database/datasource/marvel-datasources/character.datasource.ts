import { characterModel } from "@/database/models/character.model";
import axios from "axios";
import * as dotenv from "dotenv";
import CharacterDatasource from "../abstract-datasources/character.datasource";
dotenv.config();

export default class CharacterDatasourceImpl implements CharacterDatasource {
  async getCharacters(limit: number): Promise<characterModel[]> {
    try {
      const characters = await axios({
        method: "get",
        url: `http://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=1&apikey=${process.env.PUBLISH_KEY}&hash=${process.env.HASH_KEY}`,
      });
      const res: characterModel[] = characters.data.data.results.map(
        (result: any) => characterModel.fromJSON(result)
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCharacterById(id: string): Promise<characterModel> {
    try {
      const character = await axios({
        method: "get",
        url: `http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${process.env.PUBLISH_KEY}&hash=${process.env.HASH_KEY}`,
      });
      const res: characterModel = character.data.data.results.map(
        (result: any) => characterModel.fromJSON(result)
      );
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
