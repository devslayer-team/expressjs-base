import CommentDatasource from "../datasource/abstract-datasources/comment.datasource";
import { CommentModel } from "../models/comment.model";

export default class CommentRepository {
  public commentDatasource: CommentDatasource;

  constructor(commentDatasource: CommentDatasource) {
    this.commentDatasource = commentDatasource;
  }

  public addCharacterComment = async (
    userId: string,
    characterId: string,
    text: string
  ) => {
    return await this.commentDatasource.addCharacterComment(
      userId,
      characterId,
      text
    );
  };

  public deleteCharacterComment = async (commentId: string) => {
    return await this.commentDatasource.deleteCharacterComment(commentId);
  };
}
