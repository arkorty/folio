import axios from "axios";
import matter from "gray-matter";

export async function GET(request) {
  const username = process.env.PUBLIC_NEXT_GITHUB_USERNAME;
  const repo = process.env.BLOG_REPO_NAME || "blog";
  const token = process.env.GITHUB_TOKEN;
  const blogPath = process.env.BLOG_PATH || "entries";

  if (!username || !token) {
    return new Response(
      JSON.stringify({ error: "Missing GitHub Credentials" }),
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

    const mdFiles = contentRes.data.filter(
      (file) => file.name.endsWith(".md") || file.name.endsWith(".markdown")
    );

    const blogPromises = mdFiles.map(async (file) => {
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

      let commitUsername = username;
      if (latestCommit.author && latestCommit.author.login) {
        commitUsername = latestCommit.author.login;
      }

      const { data: frontMatter, content } = matter(fileContent);

      const slug = file.name.replace(/\.md$|\.markdown$/, "");

      return {
        slug,
        content,

        metadata: {
          ...frontMatter,
          author: frontMatter.author || latestCommit.commit.author.name,
          username: frontMatter.username || commitUsername,
          createdAt: frontMatter.date || firstCommit.commit.author.date,
          updatedAt: latestCommit.commit.author.date,
          title: frontMatter.title || slug.replace(/-/g, " "),
        },
      };
    });

    const blogs = await Promise.all(blogPromises);

    blogs.sort(
      (a, b) => new Date(b.metadata.createdAt) - new Date(a.metadata.createdAt)
    );

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching blog posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
