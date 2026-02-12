import { crowdinBearerHeaders } from "../../config"

interface CrowdinUser {
  id: number
  username: string
  email: string
  emailVerified: boolean
  fullName: string
  avatarUrl: string
  createdAt: string
  lastSeen: string
  twoFactor: string
  timezone: string
}

interface CrowdinUserResponse {
  data: CrowdinUser
}

/**
 * Get the authenticated Crowdin user's information
 * @returns The authenticated user's data
 */
export async function getCurrentUser(): Promise<CrowdinUser> {
  const url = "https://api.crowdin.com/api/v2/user"

  const response = await fetch(url, {
    method: "GET",
    headers: crowdinBearerHeaders,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(
      `Failed to fetch current user (${response.status}): ${text}`
    )
  }

  const json = (await response.json()) as CrowdinUserResponse
  return json.data
}
