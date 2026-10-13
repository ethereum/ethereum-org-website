import type {
  BuilderResourcesCatalogResource,
  DeveloperToolsRankingMetadata,
  DeveloperToolsRepoLink,
} from "@/lib/types"

const DEPENDENCY_GRAPH_URL =
  "https://raw.githubusercontent.com/deepfunding/dependency-graph/main/datasets/gg24-phase2/seedReposWithDependenciesAndWeights.json"

const DAMPING = 0.85
const MAX_ITERATIONS = 40
const EPSILON = 1e-8
const ALGORITHM_VERSION = "builder-resources-rank-v1"

const RANKING_RULES = {
  starsLogWeight: 0.4,
  forksLogWeight: 0.2,
  watchersLogWeight: 0.1,
  subscribersLogWeight: 0.08,
  openIssuesLogWeight: 0.05,
  freshnessMaxBoost: 0.25,
  freshnessWindowDays: 30,
  stalenessGraceDays: 180,
  stalenessPenaltyPerDay: 0.0012,
  archivedPenalty: 0.75,
  forkPenalty: 0.12,
}

type WeightedEdge = {
  to: string
  weight: number
}

type RepoScore = {
  source: "official-weight" | "github-inferred" | "unscored"
  score: number
  officialScore?: number
  inferredScore?: number
}

function normalizeGitHubRepoUrl(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    if (!/^(www\.)?github\.com$/i.test(parsed.hostname)) return null
    const parts = parsed.pathname
      .split("/")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.toLowerCase().replace(/\.git$/i, ""))

    if (parts.length < 2 || !parts[0] || !parts[1]) return null
    return `https://github.com/${parts[0]}/${parts[1]}`
  } catch {
    const shorthand = trimmed
      .replace(/^github:/i, "")
      .replace(/^https?:\/\/github\.com\//i, "")
      .replace(/^www\.github\.com\//i, "")
      .replace(/[#?].*$/, "")
      .replace(/\.git$/i, "")
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase()

    const parts = shorthand.split("/").filter(Boolean)
    if (parts.length < 2) return null
    return `https://github.com/${parts[0]}/${parts[1]}`
  }
}

function getRepoHref(
  repo: BuilderResourcesCatalogResource["repos"][number]
): string {
  return typeof repo === "string" ? repo : repo.href
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const numeric = Number(value)
    if (Number.isFinite(numeric)) return numeric
  }
  return null
}

function extractDependencyEdges(
  node: unknown
): Array<{ repo: string; weight: number }> {
  if (Array.isArray(node)) {
    const result: Array<{ repo: string; weight: number }> = []
    for (const item of node) {
      if (typeof item === "string") {
        result.push({ repo: item, weight: 1 })
        continue
      }
      if (!isRecord(item)) continue
      const repoCandidate =
        (typeof item.repo === "string" && item.repo) ||
        (typeof item.repository === "string" && item.repository) ||
        (typeof item.url === "string" && item.url) ||
        (typeof item.dep === "string" && item.dep) ||
        (typeof item.name === "string" && item.name)
      if (!repoCandidate) continue
      const weight =
        toFiniteNumber(item.weight) ??
        toFiniteNumber(item.normalizedWeight) ??
        toFiniteNumber(item.score) ??
        1
      result.push({ repo: repoCandidate, weight: Math.max(weight, 0) })
    }
    return result
  }

  if (!isRecord(node)) return []

  const recursiveContainer =
    node.dependencies ??
    node.dependencyMap ??
    node.dependencyWeights ??
    node.weightedDependencies
  if (recursiveContainer !== undefined) {
    return extractDependencyEdges(recursiveContainer)
  }

  const result: Array<{ repo: string; weight: number }> = []
  for (const [key, value] of Object.entries(node)) {
    const directWeight = toFiniteNumber(value)
    if (directWeight !== null) {
      result.push({ repo: key, weight: Math.max(directWeight, 0) })
      continue
    }

    if (isRecord(value)) {
      const nestedWeight =
        toFiniteNumber(value.weight) ??
        toFiniteNumber(value.normalizedWeight) ??
        toFiniteNumber(value.score)
      if (nestedWeight !== null) {
        result.push({ repo: key, weight: Math.max(nestedWeight, 0) })
      }
    }
  }
  return result
}

function calculateOfficialScores(
  seedGraph: Record<string, unknown>
): Map<string, number> {
  const outgoing = new Map<string, WeightedEdge[]>()
  const seeds = new Set<string>()
  const nodes = new Set<string>()

  for (const [rootRepoRaw, payload] of Object.entries(seedGraph)) {
    const root = normalizeGitHubRepoUrl(rootRepoRaw)
    if (!root) continue

    seeds.add(root)
    nodes.add(root)

    const extracted = extractDependencyEdges(payload)
    if (extracted.length === 0) continue

    const normalizedEdges: WeightedEdge[] = []
    for (const edge of extracted) {
      const dependency = normalizeGitHubRepoUrl(edge.repo)
      if (!dependency) continue
      nodes.add(dependency)
      normalizedEdges.push({ to: dependency, weight: edge.weight })
    }
    if (normalizedEdges.length === 0) continue

    const weightSum = normalizedEdges.reduce(
      (sum, edge) => sum + edge.weight,
      0
    )
    const safeWeight = weightSum > 0 ? weightSum : normalizedEdges.length
    outgoing.set(
      root,
      normalizedEdges.map((edge) => ({
        to: edge.to,
        weight: edge.weight / safeWeight,
      }))
    )
  }

  const current = new Map<string, number>()
  for (const node of nodes) {
    current.set(node, seeds.has(node) ? 1 : 0)
  }

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const next = new Map<string, number>()
    for (const node of nodes) {
      next.set(node, seeds.has(node) ? 1 : 0)
    }

    for (const [parent, edges] of outgoing) {
      const parentScore = current.get(parent) ?? 0
      if (parentScore <= 0) continue
      const propagated = parentScore * DAMPING
      for (const edge of edges) {
        next.set(edge.to, (next.get(edge.to) ?? 0) + propagated * edge.weight)
      }
    }

    let delta = 0
    for (const node of nodes) {
      delta = Math.max(
        delta,
        Math.abs((next.get(node) ?? 0) - (current.get(node) ?? 0))
      )
    }

    for (const [node, value] of next) {
      current.set(node, value)
    }

    if (delta < EPSILON) break
  }

  return current
}

function daysSince(dateIso: string | null | undefined): number | undefined {
  if (!dateIso) return undefined
  const timestamp = Date.parse(dateIso)
  if (Number.isNaN(timestamp)) return undefined
  const days = (Date.now() - timestamp) / (1000 * 60 * 60 * 24)
  return Math.max(0, days)
}

function getPopularitySignal(repo: DeveloperToolsRepoLink): number {
  const stars = repo.stargazers ?? 0
  const forks = repo.forks ?? 0
  const watchers = repo.watchers ?? 0
  const subscribers = repo.subscribers ?? 0
  const openIssues = repo.openIssues ?? 0

  return (
    RANKING_RULES.starsLogWeight * Math.log1p(stars) +
    RANKING_RULES.forksLogWeight * Math.log1p(forks) +
    RANKING_RULES.watchersLogWeight * Math.log1p(watchers) +
    RANKING_RULES.subscribersLogWeight * Math.log1p(subscribers) +
    RANKING_RULES.openIssuesLogWeight * Math.log1p(openIssues)
  )
}

function getRuleDeltas(repo: DeveloperToolsRepoLink): number {
  const ageDays = repo.daysSincePush ?? daysSince(repo.lastUpdated)
  const freshnessBoost =
    ageDays !== undefined && ageDays <= RANKING_RULES.freshnessWindowDays
      ? ((RANKING_RULES.freshnessWindowDays - ageDays) /
          RANKING_RULES.freshnessWindowDays) *
        RANKING_RULES.freshnessMaxBoost
      : 0

  const stalenessPenalty =
    ageDays !== undefined && ageDays > RANKING_RULES.stalenessGraceDays
      ? (ageDays - RANKING_RULES.stalenessGraceDays) *
        RANKING_RULES.stalenessPenaltyPerDay
      : 0

  const archivedPenalty = repo.isArchived ? RANKING_RULES.archivedPenalty : 0
  const forkPenalty = repo.isFork ? RANKING_RULES.forkPenalty : 0

  return freshnessBoost - stalenessPenalty - archivedPenalty - forkPenalty
}

function getSorted(values: number[]): number[] {
  return values.slice().sort((a, b) => a - b)
}

function percentileRank(sortedValues: number[], value: number): number {
  if (sortedValues.length === 0) return 0
  let low = 0
  let high = sortedValues.length
  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    if (sortedValues[mid] <= value) low = mid + 1
    else high = mid
  }
  return (low - 1) / Math.max(sortedValues.length - 1, 1)
}

function percentileValue(sortedValues: number[], percentile: number): number {
  if (sortedValues.length === 0) return 0
  const clamped = Math.min(1, Math.max(0, percentile))
  const index = clamped * (sortedValues.length - 1)
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  if (lower === upper) return sortedValues[lower]
  const ratio = index - lower
  return (
    sortedValues[lower] + (sortedValues[upper] - sortedValues[lower]) * ratio
  )
}

function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = getSorted(values)
  const middle = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }
  return sorted[middle]
}

export async function rankDeveloperToolsResources(
  resources: BuilderResourcesCatalogResource[]
): Promise<{
  resources: BuilderResourcesCatalogResource[]
  ranking: DeveloperToolsRankingMetadata
}> {
  let seedGraph: Record<string, unknown> = {}
  try {
    const response = await fetch(DEPENDENCY_GRAPH_URL)
    if (response.ok) {
      seedGraph = (await response.json()) as Record<string, unknown>
    } else {
      console.warn(
        `Dependency graph fetch failed with status ${response.status}; continuing without official scores`
      )
    }
  } catch (error) {
    console.warn(
      "Dependency graph fetch failed; continuing without official scores",
      error
    )
  }

  const officialScores = calculateOfficialScores(seedGraph)

  const trainingPopularitySignals: number[] = []
  const trainingOfficialScores: number[] = []

  const preparedResources = resources.map((resource) => {
    const dedupedRepos = new Map<string, DeveloperToolsRepoLink>()
    for (const repoEntry of resource.repos) {
      const href = getRepoHref(repoEntry)
      const normalized = normalizeGitHubRepoUrl(href)
      if (!normalized) continue
      const repo = typeof repoEntry === "string" ? { href } : repoEntry
      dedupedRepos.set(normalized, {
        ...repo,
        href,
        daysSincePush: repo.daysSincePush ?? daysSince(repo.lastUpdated),
      })
    }

    for (const [normalized, repo] of dedupedRepos) {
      const official = officialScores.get(normalized)
      if (official === undefined) continue
      const popularitySignal = getPopularitySignal(repo)
      if (popularitySignal > 0) {
        trainingPopularitySignals.push(popularitySignal)
        trainingOfficialScores.push(official)
      }
    }

    return {
      resource,
      dedupedRepos,
    }
  })

  const sortedPopularity = getSorted(trainingPopularitySignals)
  const sortedOfficial = getSorted(trainingOfficialScores)

  let matchedOfficialRepoCount = 0
  let inferredRepoCount = 0
  let unscoredRepoCount = 0

  const scoredResources: Array<{
    resource: BuilderResourcesCatalogResource
    rawScore: number
    scoreSource: "official-weight" | "github-inferred" | "unscored"
    repoScores: RepoScore[]
  }> = preparedResources.map(({ resource }) => {
    const repoScores: RepoScore[] = []
    const enrichedRepos: BuilderResourcesCatalogResource["repos"] =
      resource.repos.map((repoEntry) => {
        const repo =
          typeof repoEntry === "string" ? { href: repoEntry } : repoEntry
        const normalized = normalizeGitHubRepoUrl(repo.href)
        if (!normalized) return repo

        const popularitySignal = getPopularitySignal(repo)
        const ruleDeltas = getRuleDeltas(repo)
        const official = officialScores.get(normalized)

        let score: RepoScore
        if (official !== undefined) {
          score = {
            source: "official-weight",
            score: official + popularitySignal + ruleDeltas,
            officialScore: official,
          }
          matchedOfficialRepoCount++
        } else if (sortedPopularity.length > 0 && popularitySignal > 0) {
          const popularityPercentile = percentileRank(
            sortedPopularity,
            popularitySignal
          )
          const inferred = percentileValue(sortedOfficial, popularityPercentile)
          score = {
            source: "github-inferred",
            score: inferred + popularitySignal + ruleDeltas,
            inferredScore: inferred,
          }
          inferredRepoCount++
        } else {
          score = {
            source: "unscored",
            score: 0,
          }
          unscoredRepoCount++
        }

        repoScores.push(score)
        return {
          ...repo,
          officialScore: score.officialScore,
          inferredScore: score.inferredScore,
          finalScore: score.score,
          scoreSource: score.source,
        }
      })

    const scoredRepoValues = repoScores
      .map((repoScore) => repoScore.score)
      .filter((score) => score > 0)
    const rawScore = scoredRepoValues.reduce((sum, value) => sum + value, 0)

    const hasOfficial = repoScores.some(
      (repoScore) => repoScore.source === "official-weight"
    )
    const hasInferred = repoScores.some(
      (repoScore) => repoScore.source === "github-inferred"
    )
    const scoreSource: "official-weight" | "github-inferred" | "unscored" =
      hasOfficial
        ? "official-weight"
        : hasInferred
          ? "github-inferred"
          : "unscored"

    return {
      resource: {
        ...resource,
        repos: enrichedRepos,
      },
      rawScore,
      scoreSource,
      repoScores,
    }
  })

  const rawScores = scoredResources
    .map((entry) => entry.rawScore)
    .filter((score) => score > 0)
  const medianFallbackScore = median(rawScores)

  const sortedByFinalScore = scoredResources
    .map((entry) => ({
      ...entry,
      finalScore: entry.rawScore > 0 ? entry.rawScore : medianFallbackScore,
    }))
    .sort((a, b) => b.finalScore - a.finalScore)

  const rankedResources = sortedByFinalScore.map((entry, index) => ({
    ...entry.resource,
    resource_raw_score: entry.rawScore,
    resource_score: entry.finalScore,
    resource_rank: index + 1,
    resource_score_source: entry.scoreSource,
  }))

  const ranking: DeveloperToolsRankingMetadata = {
    rankingAlgorithmVersion: ALGORITHM_VERSION,
    damping: DAMPING,
    maxIterations: MAX_ITERATIONS,
    rules: RANKING_RULES,
    coverage: {
      totalResources: resources.length,
      scoredResources: rawScores.length,
      usedMedianFallbackCount: rankedResources.length - rawScores.length,
      matchedOfficialRepoCount,
      inferredRepoCount,
      unscoredRepoCount,
      trainingSampleCount: trainingPopularitySignals.length,
    },
  }

  return {
    resources: rankedResources,
    ranking,
  }
}
