"use client"

import { inferAdditionalFields, siweClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { passkeyClient } from "@better-auth/passkey/client"

import { withTrailingSlash } from "@/lib/utils/api-path"

/** Same-origin `/api/auth`; the session is read in the browser so pages stay static */
export const authClient = createAuthClient({
  // Request the slash form directly, skipping the site's redirect to it
  fetchOptions: {
    customFetchImpl: (input, init) =>
      fetch(
        typeof input === "string" || input instanceof URL
          ? withTrailingSlash(input.toString())
          : input,
        init
      ),
  },
  plugins: [
    siweClient(),
    passkeyClient(),
    inferAdditionalFields({
      user: { showOnLeaderboard: { type: "boolean", required: false } },
    }),
  ],
})
