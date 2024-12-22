import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Author Name",
    }),
    defineField({
      name: "postDate",
      title: "Post Date",
      type: "date",
      description: "The date of the post",
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Bio",
    }),
  ],
});
