import { defineType, defineField, defineArrayMember } from "sanity";
export const post = defineField({
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    // title
    defineField({
      name: "title",
      type: "string",
      title: "Post Title",
      description: "Title of the post",
      validation: (Rule) => Rule.required(),
    }),

    // Slug Field
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Summary Field
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      validation: (Rule) => Rule.required(),
    }),

    // Image Field
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true, // Optional: Enables cropping for images
      },
    }),

    // Content Field
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    // On this page Field
    defineField({
      name: "otp",
      type: "string",
      title: "On this Page",
    }),

    // Author Reference Field
    defineField({
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
    }),

    // Gender Field (Uncommented and fixed)
    defineField({
      name: "gender",
      type: "string",
      title: "Gender",
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
        ],
        layout: "radio", // Optional: Radio button layout
        direction: "horizontal", // Optional: Horizontal alignment
      },
    }),
  ],
});
