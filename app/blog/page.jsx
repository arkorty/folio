"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { format } from "date-fns";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [processedBlogs, setProcessedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
                    .use(remarkGfm)
                    .use(html, { sanitize: false })
                    .process(previewText);
                  previewHtml = processedPreview.toString();

                  previewHtml = previewHtml.replace(
                    /<img /g,
                    '<img class="hidden sm:block aspect-[4/1] object-cover my-4 rounded-md" '
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

  const filteredBlogs = searchTerm
    ? processedBlogs.filter(blog => 
        blog.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.metadata.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.processedData.allTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : processedBlogs;

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-6">My Blog</h1>
          <p className="text-xl text-[#ADB7BE] max-w-2xl">
            Explore my thoughts, experiences, and insights on various topics. From technical deep-dives to personal reflections, discover the stories behind the code.
          </p>
          
          {/* Search input */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search blog posts, authors, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-lg bg-[#18191E] text-white border border-[#33353F] focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </header>

        <section>
          {isLoading && (
            <div className="py-10">
              <div className="w-full max-w-4xl mx-auto">
                <div className="h-1 bg-[#33353F] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 animate-progress"></div>
                </div>
                <p className="text-center text-[#ADB7BE] mt-4">Loading blog posts...</p>
              </div>
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

          <div className="max-w-4xl mx-auto">
            {filteredBlogs
              .sort(
                (a, b) =>
                  new Date(b.metadata.createdAt) - new Date(a.metadata.createdAt)
              )
              .map((blog, index) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {index !== filteredBlogs.length - 1 && (
                    <div className="absolute left-4 top-10 h-full w-0.5 bg-amber-500/30"></div>
                  )}
                  <div className="flex items-start gap-8">
                    <div className="bg-amber-500 rounded-full h-8 w-8 mt-1.5 flex-shrink-0 z-10"></div>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="bg-[#222222] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 w-full"
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
                </motion.div>
              ))}
            
            {!isLoading && filteredBlogs.length === 0 && processedBlogs.length > 0 && (
              <div className="text-center py-12">
                <p className="text-[#ADB7BE] text-lg">No blog posts match your search criteria.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
