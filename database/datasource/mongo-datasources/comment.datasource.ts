import { CommentModel } from "@/database/models/comment.model";
import MongoCommentModel from "./models/comment.model";
import MongoUserModel from "./models/user.model";
import CommentDatasource from "../abstract-datasources/comment.datasource";
import { UserModel } from "@/database/models/user.model";
import { ObjectId } from "mongodb";
import { isObjectIdOrHexString } from "mongoose";
export class CommentDatasourceImpl implements CommentDatasource {
  async addCharacterComment(
    userId: string,
    characterId: string,
    text: string
  ): Promise<string> {
    try {
      const user = await MongoUserModel.findOne({ _id: userId });
      if (!user) throw new Error("User not found");
      const userdata = UserModel.fromJSON(user).user;
      // console.log(user);
      const newComment = new MongoCommentModel({
        userId: userId,
        characterId: characterId,
        text: text,
        userAvatar: userdata.userAvatar,
      });
      const result = await newComment.save();
      return "comment created successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteCharacterComment(commentId: string): Promise<string> {
    try {
      if (!isObjectIdOrHexString(commentId)) {
        throw new Error("Comment not found");
      }
      const deletedComment = await MongoCommentModel.findByIdAndDelete(
        new ObjectId(commentId)
      );
      if (deletedComment === null) {
        throw new Error("Comment not found");
      }
      return "Comment deleted successfully";
    } catch (error) {
      throw new Error("Error deleting comment: " + error.message);
    }
  }
}
