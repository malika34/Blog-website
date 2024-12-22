import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const query = `*[_type == "post"]{
  title,
  summary,
  image,
  "slug": slug.current, // Fetch the slug's current value
  author->{
    name,
    bio,
    postDate
  },
}`;

const Blog = async () => {
  const blogs: Post[] = await client.fetch(query);
  //console.log(blogs);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md overflow-hidden dark:border-2 transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={urlFor(blog.image).url()} // Generate the image URL
              alt={blog.title}
              height={800}
              width={800}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="mb-4">{blog.summary}</p>
              <div className="text-sm mb-4">
                <span>By {blog.author.name}</span> |{" "}
                <span>
                  {new Date(blog.author.postDate).toLocaleDateString()}
                </span>
              </div>
              <Link
                href={`/blogpost/${blog.slug}`} // Ensure slug is a string
                className={buttonVariants({ variant: "outline" })}
              >
                Click here
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
