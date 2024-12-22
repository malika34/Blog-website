import { client } from "@/sanity/lib/client"; // Ensure client is properly configured
import { PortableText } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import { notFound } from "next/navigation";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import OnThisPage from "@/components/ui/onthispage";
import Comments from "@/components/ui/Comments";

interface Author {
  name: string;
  bio?: string;
  postDate?: string;
}

interface Post {
  title: string;
  description: string;
  content: TypedObject | TypedObject[]; // Updated type
  author: Author;
  date?: string;
}

const query = `*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  content,
  author->{
    name,
    bio,
    postDate,
  },
}`;

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch the blog post using the slug
  const post: Post | null = await client.fetch(query, { slug: params.slug });

  if (!post) {
    notFound();
    return null;
  }

  // Process the content using unified
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeAutolinkHeadings)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    });

  const htmlContent = (
    await processor.process(post.content as unknown as string)
  ).toString();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
        &quot;{post.author.bio}&quot;
      </p>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 mb-4 italic">
          By {post.author.name}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {post.date || post.author.postDate}
        </p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="prose dark:prose-invert"
      ></div>
      <OnThisPage htmlContent={htmlContent} />
      <div className="prose dark:prose-invert">
        <PortableText value={post.content} />
      </div>
      <div>
        <Comments />
      </div>
    </div>
  );
}
