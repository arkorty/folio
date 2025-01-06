import axios from "axios";

export async function GET(request, response) {
  const username = process.env.PUBLIC_NEXT_GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

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

    let page = 1;
    let allRepos = [];
    let hasMore = true;

    while (hasMore) {
      const reposRes = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        { headers }
      );

      allRepos = [...allRepos, ...reposRes.data];

      hasMore = reposRes.data.length === 100;
      page++;
    }

    const fetchAllCommitsForRepo = async (repo) => {
      let page = 1;
      let commits = 0;
      let hasMore = true;

      while (hasMore) {
        try {
          const commitsRes = await axios.get(
            `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100&page=${page}`,
            { headers }
          );

          const repoCommits = commitsRes.data;
          commits += repoCommits.length;

          hasMore = repoCommits.length === 100;
          page++;
        } catch (error) {
          console.error(`Error fetching commits for ${repo.name}:`, error);
          break;
        }
      }

      return { repo: repo.name, commits, language: repo.language };
    };

    const commitPromises = allRepos.map((repo) => fetchAllCommitsForRepo(repo));
    const commitDetails = await Promise.all(commitPromises);

    const totalCommits = commitDetails.reduce(
      (acc, detail) => acc + detail.commits,
      0
    );
    const totalRepos = allRepos.length;
    const totalStars = allRepos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0
    );

    const languageStats = commitDetails.reduce((acc, { language }) => {
      if (language) {
        acc[language] = (acc[language] || 0) + 1;
      }
      return acc;
    }, {});

    const followersRes = await axios.get(
      `https://api.github.com/users/${username}/followers`,
      { headers }
    );

    const followers = followersRes.data.length;

    return new Response(
      JSON.stringify({
        repos: totalRepos,
        commits: totalCommits,
        stars: totalStars,
        languages: languageStats,
        followers: followers,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
