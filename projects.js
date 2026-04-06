(function () {
  const USERNAME = "noSkcaHdat";
  const FEATURED = [
    {
      name: "Phisher.io",
      kicker: "TypeScript",
      summary: "Security-focused project surfaced from the public GitHub profile."
    },
    {
      name: "ZKP-Zero-Knowledge-Proof--Age-Identification-System",
      kicker: "TypeScript",
      summary: "Identity and privacy-oriented work centered on zero-knowledge proof concepts."
    },
    {
      name: "ai-cooked",
      kicker: "Python",
      summary: "An AI-flavored build from the profile's public project set."
    },
    {
      name: "hostel-management-web",
      kicker: "JavaScript",
      summary: "A web application project with workflow and operations focus."
    },
    {
      name: "LLM-FireEye",
      kicker: "Security",
      summary: "Repository name suggests LLM monitoring and defensive workflow exploration."
    },
    {
      name: "noskcahVoiceAssistant",
      kicker: "Python",
      summary: "Voice-assistant experimentation from the public GitHub project set."
    }
  ];

  const handleEl = document.getElementById("profile-handle");
  const repoCountEl = document.getElementById("repo-count");
  const featuredEl = document.getElementById("featured-projects");
  const repoFeedEl = document.getElementById("repo-feed");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(value) {
    if (!value) return "Unknown";
    const date = new Date(value);
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function renderFeaturedCard(repo, fallback) {
    const language = repo.language || fallback.kicker || "Repository";
    const description = repo.description || fallback.summary;
    const stars = Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : 0;
    const demoLink = repo.homepage ? `<a class="card-link" href="${escapeHtml(repo.homepage)}" rel="noopener" target="_blank">Live demo</a>` : "";

    return `
      <article class="project-card">
        <div class="project-topline">
          <span class="project-tag">${escapeHtml(language)}</span>
          <span class="project-id">${stars} star${stars === 1 ? "" : "s"}</span>
        </div>
        <h3>${escapeHtml(repo.name)}</h3>
        <p class="project-summary">${escapeHtml(description || "Public GitHub repository from HacksonAloysis.")}</p>
        <dl class="project-facts">
          <div>
            <dt>Repository</dt>
            <dd><a class="inline-link" href="${escapeHtml(repo.html_url)}" rel="noopener" target="_blank">${escapeHtml(repo.html_url.replace("https://github.com/", ""))}</a></dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>${escapeHtml(formatDate(repo.pushed_at))}</dd>
          </div>
          <div>
            <dt>Actions</dt>
            <dd class="link-row">
              <a class="card-link" href="${escapeHtml(repo.html_url)}" rel="noopener" target="_blank">Open repo</a>
              ${demoLink}
            </dd>
          </div>
        </dl>
      </article>
    `;
  }

  function renderRepoCard(repo) {
    const language = repo.language || "Mixed";
    const description = repo.description || "Public repository on GitHub.";
    const homepage = repo.homepage ? `<a class="repo-link" href="${escapeHtml(repo.homepage)}" rel="noopener" target="_blank">Demo</a>` : "";

    return `
      <article class="repo-card">
        <div class="repo-card__head">
          <h3><a class="inline-link" href="${escapeHtml(repo.html_url)}" rel="noopener" target="_blank">${escapeHtml(repo.name)}</a></h3>
          <span class="repo-language">${escapeHtml(language)}</span>
        </div>
        <p class="repo-description">${escapeHtml(description)}</p>
        <div class="repo-meta">
          <span>Updated ${escapeHtml(formatDate(repo.pushed_at))}</span>
          <span>${escapeHtml(String(repo.stargazers_count || 0))} stars</span>
          ${homepage}
        </div>
      </article>
    `;
  }

  async function loadGitHubProjects() {
    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`),
        fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`)
      ]);

      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error("GitHub API request failed.");
      }

      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
      const publicRepos = Array.isArray(repos) ? repos.filter((repo) => !repo.archived) : [];
      const nonForkRepos = publicRepos.filter((repo) => !repo.fork);
      const repoMap = new Map(publicRepos.map((repo) => [repo.name, repo]));

      handleEl.textContent = `@${profile.login || USERNAME}`;
      repoCountEl.textContent = String(profile.public_repos || nonForkRepos.length);

      const featuredMarkup = FEATURED.map((item) => {
        const repo = repoMap.get(item.name);
        if (!repo) return "";
        return renderFeaturedCard(repo, item);
      }).join("");

      featuredEl.innerHTML = featuredMarkup || `
        <article class="status-card">
          <p>No featured repositories were found on the public profile.</p>
        </article>
      `;

      const repoFeedMarkup = nonForkRepos
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .map((repo) => renderRepoCard(repo))
        .join("");

      repoFeedEl.innerHTML = repoFeedMarkup || `
        <article class="status-card">
          <p>No public repositories were returned from GitHub.</p>
        </article>
      `;
    } catch (error) {
      handleEl.textContent = `@${USERNAME}`;
      repoCountEl.textContent = "Unavailable";
      featuredEl.innerHTML = `
        <article class="status-card">
          <p>Featured repositories could not be loaded from GitHub right now.</p>
        </article>
      `;
      repoFeedEl.innerHTML = `
        <article class="status-card">
          <p>The public GitHub repository feed is temporarily unavailable. Please try again later or open the profile directly.</p>
        </article>
      `;
    }
  }

  loadGitHubProjects();
}());
