"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { format } from "date-fns";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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
      <div className="container mt-16 md:mt-24 mx-auto px-4 md:px-12 py-4">
        <Link
          href="/blog"
          className="text-amber-400 hover:text-amber-300 inline-flex items-center mb-6"
        >
          <ArrowLeftIcon className="mr-2 w-6" />
          Back to Blog
        </Link>

        {isLoading && (
          <div className="flex justify-center items-center py-12 md:py-20">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-2 border-t-amber-500 border-r-transparent border-b-amber-500 border-l-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-white p-3 md:p-4 rounded-md shadow-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400 mr-2 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {!isLoading && post && (
          <article className="max-w-3xl md:max-w-4xl mx-auto rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
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
