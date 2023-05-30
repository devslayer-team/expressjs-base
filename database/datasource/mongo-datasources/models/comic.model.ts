import mongoose from "mongoose";

const Schema = mongoose.Schema;

// comicID		int
// title		string
// description		string
// thumbnail
// 	path	string
// 	extension	string
// creators		array[CREATORS]
// comments		array[COMMENTS]
// modified	Date

const ComicSchema = new Schema(
  {
    comicID: {
      type: Number,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: {
      type: {
        path: { type: String, required: true },
        extension: { type: String, required: true },
      },
      required: true,
    },

    creators: Array,
    comments: Array,
  },
  {
    timestamps: true,
  }
);

const ComicModel = mongoose.model("comic", ComicSchema);

export default ComicModel;
