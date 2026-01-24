export interface DeveloperAppMeta {
  id: string
  title: string
  summary: string
  icon?: string
  category: string
}

export interface DeveloperAppContent extends DeveloperAppMeta {
  description: string
  website?: string
  github?: string
}

export interface Category {
  id: string
  title: string
  description: string
}
