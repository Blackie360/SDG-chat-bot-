// 1. First, create a GitHub API utility: utils/github.ts
import { Octokit } from "@octokit/rest"

export async function fetchGitHubData(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken })
  
  const [user, repos, activities] = await Promise.all([
    octokit.rest.users.getAuthenticated(),
    octokit.rest.repos.listForAuthenticatedUser(),
    octokit.rest.activity.listPublicEventsForAuthenticatedUser({
      username: (await octokit.rest.users.getAuthenticated()).data.login,
      per_page: 10
    })
  ])

  return {
    user: user.data,
    repos: repos.data,
    activities: activities.data
  }
}