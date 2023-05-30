import { Extension, Base, Comment, Creator } from "./base.model";

export interface Comic extends Base {
	creators: Creator[];
	comments: Comment[];
	title: string;
	modified: Date;
}