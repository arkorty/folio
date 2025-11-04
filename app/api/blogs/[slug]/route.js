import axios from "axios";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export async function GET(request, { params }) {
  const { slug } = params;
  const username = process.env.PUBLIC_NEXT_GITHUB_USERNAME;
  const repo = process.env.BLOG_REPO_NAME || "blog";
  const token = process.env.GITHUB_TOKEN;
  const blogPath = process.env.BLOG_PATH || "entries";

  if (!username || !token || !slug) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const contentRes = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/contents/${blogPath}`,
      { headers }
    );

    const file = contentRes.data.find(
      (file) => file.name === `${slug}.md` || file.name === `${slug}.markdown`
    );

    if (!file) {
      return new Response(JSON.stringify({ error: "Blog post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fileRes = await axios.get(file.download_url);
    const fileContent = fileRes.data;

    const commitsRes = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/commits`,
      {
        params: { path: file.path },
        headers,
      }
    );

    const latestCommit = commitsRes.data[0];
    const firstCommit = commitsRes.data[commitsRes.data.length - 1];

    const { data: frontMatter, content } = matter(fileContent);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    let commitUsername = username;
    if (latestCommit.author && latestCommit.author.login) {
      commitUsername = latestCommit.author.login;
    }

    const blogPost = {
      slug,
      content: contentHtml,
      metadata: {
        ...frontMatter,
        author: frontMatter.author || latestCommit.commit.author.name,
        username: commitUsername,
        createdAt: frontMatter.date || firstCommit.commit.author.date,
        updatedAt: latestCommit.commit.author.date,
        title: frontMatter.title || slug.replace(/-/g, " "),
      },
    };

    return new Response(JSON.stringify(blogPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return new Response(JSON.stringify({ error: "Error fetching blog post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
