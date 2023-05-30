import { Extension } from "./base.model";

export interface Comment {
  commentId: string;
  userId?: string;
  comicId?: string;
  characterId: string;
  text: string;
  userAvatar: {
    path: string;
    extension: Extension;
  };
  createdAt: string;
  updatedAt: string;
}
