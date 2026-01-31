// GitHub Repo Booster - Background Service Worker
// Handles API calls and data processing

const GITHUB_API_BASE = 'https://api.github.com';

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchRepoData') {
    fetchRepositoryData(request.owner, request.repo)
      .then(data => sendResponse({ data }))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Required for async response
  }
});

async function fetchRepositoryData(owner, repo) {
  try {
    // Fetch main repository data
    const repoResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
    
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }
    
    const repoData = await repoResponse.json();
    
    // Fetch commits data (limited to check activity)
    const commitsResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=1`
    );
    
    let lastCommitDate = null;
    if (commitsResponse.ok) {
      const commits = await commitsResponse.json();
      if (commits.length > 0) {
        lastCommitDate = new Date(commits[0].commit.author.date);
      }
    }
    
    // Fetch contributors count
    const contributorsResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=1`
    );
    
    let contributorsCount = 0;
    if (contributorsResponse.ok) {
      const linkHeader = contributorsResponse.headers.get('Link');
      contributorsCount = parseLinkHeaderForCount(linkHeader) || 1;
    }
    
    // Check for README
    const readmeResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`
    );
    const hasReadme = readmeResponse.ok;
    
    // Process and analyze data
    const analysis = analyzeRepositoryData(repoData, lastCommitDate, contributorsCount, hasReadme);
    
    return {
      raw: {
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        language: repoData.language,
        createdAt: repoData.created_at,
        updatedAt: repoData.updated_at,
        pushedAt: repoData.pushed_at,
        openIssues: repoData.open_issues_count,
        hasLicense: !!repoData.license,
        defaultBranch: repoData.default_branch
      },
      analysis
    };
  } catch (error) {
    console.error('Error fetching repository data:', error);
    throw error;
  }
}

function analyzeRepositoryData(repoData, lastCommitDate, contributorsCount, hasReadme) {
  const now = new Date();
  const pushedAt = new Date(repoData.pushed_at);
  const createdAt = new Date(repoData.created_at);
  
  // Calculate days since last commit
  const lastCommitDays = lastCommitDate 
    ? Math.floor((now - lastCommitDate) / (1000 * 60 * 60 * 24))
    : Math.floor((now - pushedAt) / (1000 * 60 * 60 * 24));
  
  // Calculate repository age in days
  const repoAgeDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
  
  // Estimate total commits (GitHub doesn't provide this directly in basic API)
  // This is an approximation based on activity
  const estimatedCommits = estimateTotalCommits(repoAgeDays, lastCommitDays);
  
  return {
    lastCommitDays,
    lastCommitDate: lastCommitDate ? lastCommitDate.toISOString() : pushedAt.toISOString(),
    totalCommits: estimatedCommits,
    openIssues: repoData.open_issues_count,
    closedIssues: 0, // Would need additional API call
    contributors: contributorsCount,
    hasReadme,
    hasLicense: !!repoData.license,
    repoAgeDays,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    activityScore: calculateActivityScore(lastCommitDays, repoData.open_issues_count, contributorsCount)
  };
}

function estimateTotalCommits(repoAgeDays, lastCommitDays) {
  // Simple estimation logic
  // This is a rough approximation - PRO version would fetch actual data
  if (lastCommitDays <= 7) {
    return Math.floor(repoAgeDays / 2); // Very active
  } else if (lastCommitDays <= 30) {
    return Math.floor(repoAgeDays / 5); // Active
  } else if (lastCommitDays <= 180) {
    return Math.floor(repoAgeDays / 10); // Low activity
  } else {
    return Math.floor(repoAgeDays / 30); // Abandoned
  }
}

function calculateActivityScore(lastCommitDays, openIssues, contributors) {
  let score = 100;
  
  // Penalize for old commits
  if (lastCommitDays > 30) score -= 20;
  if (lastCommitDays > 90) score -= 20;
  if (lastCommitDays > 180) score -= 30;
  if (lastCommitDays > 365) score -= 20;
  
  // Penalize for too many open issues (indicates poor maintenance)
  if (openIssues > 50) score -= 10;
  if (openIssues > 100) score -= 10;
  
  // Bonus for multiple contributors
  if (contributors > 5) score += 10;
  if (contributors > 20) score += 10;
  
  return Math.max(0, Math.min(100, score));
}

function parseLinkHeaderForCount(linkHeader) {
  if (!linkHeader) return null;
  
  const match = linkHeader.match(/page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1]) : null;
}

// Helper function to handle rate limiting
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (response.status === 403) {
        // Rate limited
        const resetTime = response.headers.get('X-RateLimit-Reset');
        if (resetTime) {
          console.warn('Rate limited. Reset at:', new Date(resetTime * 1000));
        }
        throw new Error('GitHub API rate limit exceeded');
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Installation handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('GitHub Repo Booster installed!');
    // Could open welcome page here
  } else if (details.reason === 'update') {
    console.log('GitHub Repo Booster updated!');
  }
});
