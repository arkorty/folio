"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { format } from "date-fns";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-4 md:px-12 py-4">
        <Link
          href="/blog"
          className="text-amber-400 hover:text-amber-300 inline-flex items-center mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Blog
        </Link>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-white p-4 rounded-md">
            {error}
          </div>
        )}

        {!isLoading && post && (
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.metadata.title}
              </h1>

              <div className="flex flex-wrap justify-between items-center text-gray-400 mb-6">
                <div className="flex items-center mr-6 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-700 flex-shrink-0">
                    <Image
                      src={`https://github.com/${post.metadata.username}.png?size=128`}
                      alt={`${post.metadata.author}'s avatar`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">By {post.metadata.author}</span>
                </div>
                <div className="mb-2">
                  <time dateTime={post.metadata.createdAt}>
                    {format(new Date(post.metadata.createdAt), "MMMM dd, yyyy")}
                  </time>
                  {post.metadata.updatedAt &&
                    post.metadata.updatedAt !== post.metadata.createdAt && (
                      <span className="ml-2 text-sm">
                        (Updated:{" "}
                        {format(
                          new Date(post.metadata.updatedAt),
                          "MMM dd, yyyy"
                        )}
                        )
                      </span>
                    )}
                </div>
              </div>

              {post.metadata.tags && (
                <div className="flex gap-2 flex-wrap mb-6">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-amber-900/30 text-amber-200 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        )}
      </div>
      <Footer />
    </main>
  );
}
