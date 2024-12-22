import { TypedObject } from "@portabletext/types";
type Author = {
  name: string;
  bio: string;
  postDate: string;
};

type Post = {
  title: string;
  summary: string;
  image: any;
  slug: string;
  content: TypedObject | TypedObject[];
  author: Author;
};
