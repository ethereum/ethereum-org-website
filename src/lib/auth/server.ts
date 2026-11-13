import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {
  APIError,
  createAuthMiddleware,
  getSessionFromCtx,
} from "better-auth/api"
import { siwe } from "better-auth/plugins/siwe"
import {
  englishDataset,
  englishRecommendedTransformers,
  RegExpMatcher,
} from "obscenity"
import { generateSiweNonce } from "viem/siwe"
import { passkey } from "@better-auth/passkey"

import { CHALLENGE_HEADER, redeemChallenge } from "./challenge"
import {
  type DisplayNameProblem,
  displayNameProblem,
  normalizeDisplayName,
  passkeyDisplayName,
} from "./display-name"
import { AUTH_DOMAIN, AUTH_HOST, AUTH_ORIGIN } from "./origin"
import { verifyWalletSignature } from "./verify-wallet"
import { countSignInMethods, walletLinking } from "./wallet-linking"

import { getDb } from "@/lib/db"
import * as schema from "@/lib/db/schema"

/** Label a password manager shows for a passkey made before any account exists */
const PASSKEY_USER_NAME = "ethereum.org learner"

/** Sign-ins that can create an account answer a proof-of-work challenge first */
const CHALLENGED_PATHS = ["/siwe/verify", "/passkey/verify-registration"]

let profanity: RegExpMatcher | undefined

/** The display-name rules, plus a word filter (also with spaces taken out) */
const checkDisplayName = (name: string): DisplayNameProblem | null => {
  if (normalizeDisplayName(name) !== name) return "characters"
  const problem = displayNameProblem(name)
  if (problem) return problem
  profanity ??= new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  })
  return profanity.hasMatch(name) || profanity.hasMatch(name.replace(/ /g, ""))
    ? "language"
    : null
}

const createAuth = () =>
  betterAuth({
    baseURL: AUTH_ORIGIN,
    secret: process.env.LEARNER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    telemetry: { enabled: false },
    // No per-IP limits: a school or office shares one address. Account
    // creation is gated by the proof-of-work challenge instead
    rateLimit: { enabled: false },
    user: {
      additionalFields: {
        // Opt-out, asked at sign-up and changeable on the profile page
        showOnLeaderboard: {
          type: "boolean",
          defaultValue: true,
          required: false,
          input: true,
        },
      },
      deleteUser: { enabled: true },
    },
    databaseHooks: {
      session: {
        create: {
          // Sessions don't need to know where or on what device someone is
          before: async (session) => ({
            data: { ...session, ipAddress: null, userAgent: null },
          }),
        },
      },
    },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (CHALLENGED_PATHS.includes(ctx.path)) {
          // Adding a passkey to a signed-in account creates nothing
          const signedIn =
            ctx.path === "/passkey/verify-registration" &&
            !!(await getSessionFromCtx(ctx))
          if (
            !signedIn &&
            !(await redeemChallenge(ctx.headers?.get(CHALLENGE_HEADER) ?? null))
          )
            throw new APIError("FORBIDDEN", { message: "Challenge required" })
        }
        // The message is the problem's code; the client words it
        if (ctx.path === "/update-user" && ctx.body?.name !== undefined) {
          const problem =
            typeof ctx.body.name === "string"
              ? checkDisplayName(ctx.body.name)
              : "characters"
          if (problem) throw new APIError("BAD_REQUEST", { message: problem })
        }
        if (ctx.path === "/passkey/delete-passkey") {
          const session = await getSessionFromCtx(ctx)
          if (
            session &&
            (await countSignInMethods(ctx.context.adapter, session.user.id)) <=
              1
          )
            throw new APIError("BAD_REQUEST", {
              message: "An account needs at least one way to sign in",
            })
        }
      }),
    },
    plugins: [
      siwe({
        domain: AUTH_DOMAIN,
        getNonce: async () => generateSiweNonce(),
        verifyMessage: verifyWalletSignature,
      }),
      passkey({
        rpID: AUTH_HOST,
        rpName: "ethereum.org",
        origin: AUTH_ORIGIN,
        registration: {
          // A passkey can start an account, not only join a signed-in one
          requireSession: false,
          resolveUser: () => ({
            id: crypto.randomUUID(),
            name: PASSKEY_USER_NAME,
          }),
          // Signed in: the passkey joins that account. Otherwise create one
          afterVerification: async ({ ctx, user }) => {
            if (await ctx.context.internalAdapter.findUserById(user.id)) return
            const created = await ctx.context.internalAdapter.createUser(
              {
                name: passkeyDisplayName(),
                email: `${user.id}@passkey.placeholder.invalid`,
                emailVerified: false,
              },
              { method: "passkey" }
            )
            return { userId: created.id }
          },
        },
      }),
      walletLinking(),
    ],
  })

let auth: ReturnType<typeof createAuth> | undefined

/** Created on first use, so deploys without a learner database never connect */
export const getAuth = () => (auth ??= createAuth())

/** The signed-in user for an API request, or null */
export const getSessionUser = async (request: Request) => {
  const session = await getAuth().api.getSession({ headers: request.headers })
  return session?.user ?? null
}
