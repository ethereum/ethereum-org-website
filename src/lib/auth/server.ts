import { BASE_ERROR_CODES, betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {
  APIError,
  createAuthEndpoint,
  createAuthMiddleware,
  getSessionFromCtx,
  sessionMiddleware,
} from "better-auth/api"
import { siwe } from "better-auth/plugins/siwe"
import type { BetterAuthPlugin } from "better-auth/types"
import { randomBytes } from "node:crypto"
import {
  englishDataset,
  englishRecommendedTransformers,
  RegExpMatcher,
} from "obscenity"
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
import {
  countSignInMethods,
  isFreshSession,
  walletLinking,
} from "./wallet-linking"

import { getDb } from "@/lib/db"
import * as schema from "@/lib/db/schema"

/** Label a password manager shows for a passkey made before any account exists */
const PASSKEY_USER_NAME = "ethereum.org learner"

/** Adding a passkey: to the signed-in account, or else starting one */
const PASSKEY_REGISTRATION_PATHS = [
  "/passkey/generate-register-options",
  "/passkey/verify-registration",
]

/** Changes a stolen session mustn't make without a recent sign-in */
const FRESH_SESSION_PATHS = [
  "/passkey/delete-passkey",
  "/revoke-session",
  "/revoke-sessions",
  "/revoke-other-sessions",
]

const DAY_SECONDS = 24 * 60 * 60

let profanity: RegExpMatcher | undefined

/**
 * The account's sessions for its settings page, with dates only. Better
 * Auth's own list hands out every session's token, so it needs a fresh
 * sign-in
 */
const sessionList = () =>
  ({
    id: "session-list",
    endpoints: {
      listAccountSessions: createAuthEndpoint(
        "/sessions/list",
        { method: "GET", use: [sessionMiddleware] },
        async (ctx) => {
          const { session, user } = ctx.context.session
          const now = Date.now()
          const sessions = await ctx.context.internalAdapter.listSessions(
            user.id
          )
          return ctx.json(
            sessions
              .filter(({ expiresAt }) => new Date(expiresAt).getTime() > now)
              .map(({ id, createdAt }) => ({
                id,
                createdAt,
                current: id === session.id,
              }))
              // This one first, then the newest
              .sort(
                (a, b) =>
                  Number(b.current) - Number(a.current) ||
                  new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
              )
          )
        }
      ),
    },
  }) satisfies BetterAuthPlugin

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

/** Sign-ins that can create an account answer a proof-of-work challenge first */
const requireChallenge = async (headers: Headers | undefined) => {
  if (!(await redeemChallenge(headers?.get(CHALLENGE_HEADER) ?? null)))
    throw new APIError("FORBIDDEN", { message: "Challenge required" })
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
    // Rolling: a day of use pushes expiry 60 days out again, so active
    // learners stay signed in. Sensitive actions want a sign-in within
    // `freshAge` (a day) and ask to confirm otherwise
    session: { expiresIn: 60 * DAY_SECONDS, updateAge: DAY_SECONDS },
    user: {
      additionalFields: {
        // The browser's last reported IANA zone, for daily limits; set by
        // the course API, not by the learner
        timeZone: { type: "string", required: false, input: false },
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
        if (PASSKEY_REGISTRATION_PATHS.includes(ctx.path)) {
          const session = await getSessionFromCtx(ctx)
          // Signed in, the passkey joins the account: only soon after a
          // sign-in, so a stolen session can't add one of its own
          if (session && !isFreshSession(ctx, session))
            throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH)
          if (!session && ctx.path === "/passkey/verify-registration")
            await requireChallenge(ctx.headers)
        }
        if (ctx.path === "/siwe/verify") await requireChallenge(ctx.headers)
        // Signed in, a passkey sign-in confirms it's you: it can't switch to
        // another account (signing out comes first)
        if (ctx.path === "/passkey/verify-authentication") {
          const session = await getSessionFromCtx(ctx, { disableRefresh: true })
          const credentialID = ctx.body?.response?.id
          if (session && typeof credentialID === "string") {
            const used = await ctx.context.adapter.findOne<{ userId: string }>({
              model: "passkey",
              where: [{ field: "credentialID", value: credentialID }],
            })
            if (used && used.userId !== session.user.id)
              throw new APIError("FORBIDDEN", {
                message: "This passkey belongs to another account",
              })
          }
        }
        // The message is the problem's code; the client words it
        if (ctx.path === "/update-user" && ctx.body?.name !== undefined) {
          const problem =
            typeof ctx.body.name === "string"
              ? checkDisplayName(ctx.body.name)
              : "characters"
          if (problem) throw new APIError("BAD_REQUEST", { message: problem })
        }
        if (FRESH_SESSION_PATHS.includes(ctx.path)) {
          const session = await getSessionFromCtx(ctx)
          if (session && !isFreshSession(ctx, session))
            throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH)
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
      after: createAuthMiddleware(async (ctx) => {
        // Confirming with a passkey signed in again: the new session
        // replaces the one this browser had
        const replacement = ctx.context.newSession?.session.token
        if (ctx.path !== "/passkey/verify-authentication" || !replacement)
          return
        const previous = await ctx.getSignedCookie(
          ctx.context.authCookies.sessionToken.name,
          ctx.context.secret
        )
        if (previous && previous !== replacement)
          await ctx.context.internalAdapter.deleteSession(previous)
      }),
    },
    plugins: [
      siwe({
        domain: AUTH_DOMAIN,
        // 128 bits from the CSPRNG; viem's generateSiweNonce uses Math.random
        getNonce: async () => randomBytes(16).toString("hex"),
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
      sessionList(),
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
