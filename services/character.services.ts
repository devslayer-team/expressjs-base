import CharacterDatasource from "@/database/datasource/abstract-datasources/character.datasource";
import CharacterDatasourceImpl from "@/database/datasource/marvel-datasources/character.datasource";
import { CommentDatasourceImpl } from "@/database/datasource/mongo-datasources/comment.datasource";
import { characterModel } from "@/database/models/character.model";
import { CommentModel } from "@/database/models/comment.model";
import CharacterRepository from "@/database/repository/character.repository";
import CommentRepository from "@/database/repository/comment.repository";

export abstract class CharacterService {
  abstract getCharacters(limit: number): Promise<characterModel[]>;
  abstract getCharacterById(id: string): Promise<characterModel>;
  abstract addCharacterComment(
    userId: string,
    characterId: string,
    text: string
  ): Promise<string>;
  abstract deleteCharacterComment(commentId: string): Promise<string>;
}

export class CharacterServiceImpl implements CharacterService {
  public CharacterRepository: CharacterRepository;
  public CommentRepository: CommentRepository;

  constructor() {
    this.CharacterRepository = new CharacterRepository(
      new CharacterDatasourceImpl()
    );
    this.CommentRepository = new CommentRepository(new CommentDatasourceImpl());
  }

  getCharacters(limit: number): Promise<characterModel[]> {
    try {
      return new Promise<characterModel[]>(async (resolve) => {
        const characters = await this.CharacterRepository.getCharacters(limit);
        resolve(characters);
      });
    } catch (error) {
      throw new Error("Error to get characters: " + error);
    }
  }

  getCharacterById(id: string): Promise<characterModel> {
    try {
      return new Promise<characterModel>(async (resolve) => {
        const character = await this.CharacterRepository.getCharacterById(id);
        resolve(character);
      });
    } catch (error) {
      throw new Error("Error to get characters: " + error);
    }
  }

  addCharacterComment(
    userId: string,
    characterId: string,
    text: string
  ): Promise<string> {
    try {
      return new Promise<string>(async (resolve) => {
        resolve(
          this.CommentRepository.addCharacterComment(userId, characterId, text)
        );
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteCharacterComment(commentId: string): Promise<string> {
    try {
      return new Promise<string>(async (resolve) => {
        resolve(this.CommentRepository.deleteCharacterComment(commentId));
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
