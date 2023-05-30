import { CommentModel } from "@/database/models/comment.model";

export default abstract class CommentDatasource {
  abstract addCharacterComment(
    userId: string,
    characterId: string,
    text: string
  ): Promise<string>;

  abstract deleteCharacterComment(commentId: string): Promise<string>;
}
