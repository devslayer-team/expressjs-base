import CharacterDatasource from "../datasource/abstract-datasources/character.datasource";

export default class CharacterRepository {
  public characterDatasource: CharacterDatasource;

  constructor(characterDatasource: CharacterDatasource) {
    this.characterDatasource = characterDatasource;
  }

  public getCharacters = async (limit: number) => {
    return await this.characterDatasource.getCharacters(limit);
  };
  public getCharacterById = async (id: string) => {
    return await this.characterDatasource.getCharacterById(id);
  };
}
