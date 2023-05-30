import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    comicId: {
      type: String,
      // required: true,
    },
    characterId: {
      type: String,
      // required: true,
    },
    text: { type: String, required: true },
    userAvatar: {
      type: {
        path: { type: String, required: true },
        extension: { type: String, required: true },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentModel;
