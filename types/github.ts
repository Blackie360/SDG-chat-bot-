// /types/github.ts
export interface GitHubProfile {
    id: number
    login: string
    name: string | null
    email: string | null
    avatar_url: string
    [key: string]: any
  }
  
  export interface GitHubRepo {
    id: number
    name: string
    description: string | null
    stargazers_count: number
    forks_count: number
    default_branch: string
    html_url: string
    language: string | null
    created_at: string
    updated_at: string
    pushed_at: string
    visibility: string
    [key: string]: any
  }
  
  export interface GitHubActivity {
    id: string
    type: string
    actor: {
      id: number
      login: string
      avatar_url: string
    }
    repo: {
      id: number
      name: string
      url: string
    }
    payload: any
    created_at: string
    [key: string]: any
  }
  
  export interface GitHubData {
    user: {
      login: string
      id: number
      avatar_url: string
      name: string | null
      email: string | null
      [key: string]: any
    }
    repos: GitHubRepo[]
    activities: GitHubActivity[]
  }
  