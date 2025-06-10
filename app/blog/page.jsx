"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { format } from "date-fns";
import { remark } from "remark";
import html from "remark-html";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [processedBlogs, setProcessedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogs(data);

        const processed = await Promise.all(
          data.map(async (blog) => {
            const contentHtml = blog.content;
            const contentText = contentHtml.replace(/<[^>]*>/g, "");
            const contentLines = contentText
              .split("\n")
              .filter((line) => line.trim() !== "");

            let extractedTags = [];
            let firstLines = "";

            if (contentLines.length > 0) {
              const tagMatch = contentLines[0].match(/Tags:(.+)/i);
              if (tagMatch) {
                extractedTags =
                  tagMatch[1].match(/#\w+/g)?.map((tag) => tag.substring(1)) ||
                  [];

                firstLines = contentLines.slice(1, 4).join("\n");
              } else {
                firstLines = contentLines.slice(0, 3).join("\n");
              }
            }

            const allTags = [
              ...(blog.metadata.tags || []),
              ...extractedTags,
            ].filter((value, index, self) => self.indexOf(value) === index);

            let previewHtml = "";
            if (firstLines) {
              const previewText = firstLines;
              const words = previewText.split(" ").slice(0, 30);

              let matchFound = false;
              for (let i = 0; i < words.length && !matchFound; i++) {
                if (words[i] && words[i].length > 3) {
                  try {
                    const escapedWord = words[i].replace(
                      /[.*+?^${}()|[\]\\]/g,
                      "\\$&"
                    );
                    const regex = new RegExp(
                      `<p>[^<]*${escapedWord}[^<]*<\/p>`,
                      "i"
                    );
                    const match = contentHtml.match(regex);
                    if (match) {
                      previewHtml += match[0];
                      matchFound = true;
                    }
                  } catch (e) {
                    console.error("Regex error:", e);
                  }
                }
              }

              if (!previewHtml) {
                try {
                  const processedPreview = await remark()
                    .use(html, { sanitize: false })
                    .process(previewText);
                  previewHtml = processedPreview.toString();

                  previewHtml = previewHtml.replace(
                    /<img /g,
                    '<img class="aspect-[4/1] object-cover my-4 rounded-md" '
                  );
                } catch (e) {
                  console.error("Remark processing error:", e);
                }
              }
            }

            return {
              ...blog,
              processedData: {
                allTags,
                previewHtml,
              },
            };
          })
        );

        setProcessedBlogs(processed);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-white p-4 rounded-md">
            {error}
          </div>
        )}

        {!isLoading && !error && blogs.length === 0 && (
          <div className="text-white text-center py-10">
            No blog posts found.
          </div>
        )}

        <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
          {processedBlogs
            .sort(
              (a, b) =>
                new Date(b.metadata.createdAt) - new Date(a.metadata.createdAt)
            )
            .map((blog, index) => (
              <div key={blog.slug} className="relative">
                {index !== processedBlogs.length - 1 && (
                  <div className="absolute left-4 top-10 h-full w-0.5 bg-amber-500/30"></div>
                )}
                <div className="flex items-start gap-8">
                  <div className="bg-amber-500 rounded-full h-8 w-8 mt-1.5 flex-shrink-0 z-10"></div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="bg-[#1e1e1e] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 w-full"
                  >
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {blog.metadata.title}
                      </h2>

                      <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                        <div className="flex items-center">
                          {blog.metadata.username && (
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-700 flex-shrink-0">
                              <Image
                                src={`https://github.com/${blog.metadata.username}.png?size=128`}
                                alt={`${blog.metadata.author}'s avatar`}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span>{blog.metadata.author}</span>
                        </div>
                        <span>
                          {format(
                            new Date(blog.metadata.createdAt),
                            "MMM dd, yyyy"
                          )}
                        </span>
                      </div>

                      {blog.processedData.previewHtml && (
                        <div
                          className="text-gray-300 mb-4 prose-sm prose-invert line-clamp-3 overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html: blog.processedData.previewHtml,
                          }}
                        />
                      )}

                      <div className="flex gap-2 flex-wrap">
                        {blog.processedData.allTags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-amber-900/30 text-amber-200 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
