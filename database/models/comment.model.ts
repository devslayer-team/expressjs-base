import { Comment } from "@/models/comment.model";
import { Document } from "mongoose";

export class CommentModel {
  public comment: Comment;

  constructor(comment: Comment) {
    this.comment = comment;
  }

  toJSON(): any {
    const {
      commentId,
      userId,
      comicId,
      characterId,
      text,
      userAvatar,
      createdAt,
      updatedAt,
    } = this.comment;
    return {
      commentId,
      userId,
      comicId,
      characterId,
      text,
      userAvatar,
      createdAt,
      updatedAt,
    };
  }

  static fromJSON(json: any): CommentModel {
    const commentDocument: Comment = json as Comment;
    return new CommentModel(commentDocument);
  }
}
