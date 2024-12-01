import axios from "axios";

export default async function handler(req, res) {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username || !token) {
    return res
      .status(400)
      .json({ error: "GitHub username or token is missing" });
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Get repositories
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );
    const totalRepos = reposRes.data.length;

    // Get commits count
    let totalCommits = 0;
    for (let repo of reposRes.data) {
      const commitsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/commits`,
        { headers }
      );
      totalCommits += commitsRes.data.length;
    }

    // Get stars
    const starsRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );
    const totalStars = starsRes.data.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0
    );

    // Send response with the fetched data
    res.status(200).json({
      repos: totalRepos,
      commits: totalCommits,
      stars: totalStars,
    });
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
