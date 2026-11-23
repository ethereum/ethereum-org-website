import type { AuthContext, GenericEndpointContext } from "better-auth"
import {
  APIError,
  createAuthEndpoint,
  freshSessionMiddleware,
  sensitiveSessionMiddleware,
  sessionMiddleware,
} from "better-auth/api"
import { setSessionCookie } from "better-auth/cookies"
import type { BetterAuthPlugin } from "better-auth/types"
import { parseSiweMessage } from "viem/siwe"
import * as z from "zod"

import { AUTH_DOMAIN } from "./origin"
import {
  SIWE_CHAIN_ID,
  siweMessageProblem,
  toWalletAddress,
  verifyWalletSignature,
} from "./verify-wallet"

/** Same prefix the SIWE plugin stores its nonces under, so `/siwe/nonce` serves both */
const SIWE_NONCE_PREFIX = "siwe:"

interface WalletRow {
  id: string
  userId: string
  address: string
  chainId: number
  createdAt: Date
}

/** Sign-in methods left on an account: its passkeys plus its wallets */
export const countSignInMethods = async (
  adapter: Pick<AuthContext["adapter"], "count" | "findMany">,
  userId: string
) => {
  const where = [{ field: "userId", value: userId }]
  const [passkeys, wallets] = await Promise.all([
    adapter.count({ model: "passkey", where }),
    adapter.findMany<WalletRow>({ model: "walletAddress", where }),
  ])
  // One wallet is one way in, however many rows it has
  return passkeys + new Set(wallets.map(({ address }) => address)).size
}

/** Signed in recently enough for sensitive changes (Better Auth's `freshAge`) */
export const isFreshSession = (
  ctx: { context: Pick<AuthContext, "sessionConfig"> },
  { session }: { session: { createdAt: Date | string } }
) => {
  const { freshAge } = ctx.context.sessionConfig
  return (
    freshAge === 0 ||
    Date.now() - new Date(session.createdAt).getTime() < freshAge * 1000
  )
}

const siweBody = z.object({ message: z.string().min(1), signature: z.string() })

/** The signer of a valid SIWE message for this site on mainnet, nonce used up */
const verifiedSigner = async (
  ctx: GenericEndpointContext,
  { message, signature }: z.infer<typeof siweBody>
) => {
  const parsed = parseSiweMessage(message)
  const address = parsed.address && toWalletAddress(parsed.address)
  if (!address || siweMessageProblem(parsed, AUTH_DOMAIN))
    throw new APIError("UNAUTHORIZED", { message: "Invalid message" })
  const nonce = await ctx.context.internalAdapter.consumeVerificationValue(
    `${SIWE_NONCE_PREFIX}${parsed.nonce}`
  )
  if (!nonce) throw new APIError("UNAUTHORIZED", { message: "Invalid nonce" })
  const valid = await verifyWalletSignature({
    message,
    signature,
    address,
    chainId: SIWE_CHAIN_ID,
  })
  if (!valid)
    throw new APIError("UNAUTHORIZED", { message: "Invalid signature" })
  return address
}

/**
 * The SIWE plugin signs in by wallet, creating an account for a new one, so
 * it can't add a wallet to the account that's signed in. These endpoints do:
 * a backup wallet for an account started with a passkey, and confirming it's
 * you with one of the account's wallets before a sensitive change.
 */
export const walletLinking = () =>
  ({
    id: "wallet-linking",
    endpoints: {
      linkWallet: createAuthEndpoint(
        "/wallet/link",
        {
          method: "POST",
          body: siweBody,
          // A stolen session mustn't be able to add a wallet of its own
          use: [sensitiveSessionMiddleware, freshSessionMiddleware],
        },
        async (ctx) => {
          const address = await verifiedSigner(ctx, ctx.body)
          const userId = ctx.context.session.user.id
          const existing = await ctx.context.adapter.findOne<WalletRow>({
            model: "walletAddress",
            where: [{ field: "address", value: address }],
          })
          if (existing && existing.userId !== userId)
            throw new APIError("CONFLICT", {
              message: "This wallet belongs to another account",
            })
          if (!existing)
            await ctx.context.adapter.create({
              model: "walletAddress",
              data: {
                userId,
                address,
                chainId: SIWE_CHAIN_ID,
                isPrimary: false,
                createdAt: new Date(),
              },
            })
          return ctx.json({ address })
        }
      ),
      confirmWallet: createAuthEndpoint(
        "/wallet/confirm",
        {
          method: "POST",
          body: siweBody,
          use: [sensitiveSessionMiddleware],
        },
        async (ctx) => {
          const { session, user } = ctx.context.session
          const address = await verifiedSigner(ctx, ctx.body)
          const wallet = await ctx.context.adapter.findOne<WalletRow>({
            model: "walletAddress",
            where: [
              { field: "userId", value: user.id },
              { field: "address", value: address },
            ],
          })
          if (!wallet)
            throw new APIError("FORBIDDEN", {
              message: "This wallet isn't on the account",
            })
          // Signed in again: a new session, recent enough for sensitive
          // changes, replaces this one
          const renewed = await ctx.context.internalAdapter.createSession(
            user.id
          )
          if (!renewed)
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Unable to create session",
            })
          await setSessionCookie(ctx, { session: renewed, user })
          await ctx.context.internalAdapter.deleteSession(session.token)
          return ctx.json({ ok: true })
        }
      ),
      listWallets: createAuthEndpoint(
        "/wallet/list",
        { method: "GET", use: [sessionMiddleware] },
        async (ctx) => {
          const wallets = await ctx.context.adapter.findMany<WalletRow>({
            model: "walletAddress",
            where: [{ field: "userId", value: ctx.context.session.user.id }],
          })
          // Each address once, as first added
          const first = new Map<string, Date>()
          for (const { address, createdAt } of wallets) {
            const seen = first.get(address)
            if (!seen || createdAt < seen) first.set(address, createdAt)
          }
          return ctx.json(
            [...first].map(([address, createdAt]) => ({ address, createdAt }))
          )
        }
      ),
      unlinkWallet: createAuthEndpoint(
        "/wallet/unlink",
        {
          method: "POST",
          body: z.object({
            address: z.string().transform((value, issue) => {
              const address = toWalletAddress(value)
              if (!address)
                issue.addIssue({ code: "custom", message: "Invalid address" })
              return address ?? z.NEVER
            }),
          }),
          // A stolen session mustn't be able to lock the owner out
          use: [sensitiveSessionMiddleware, freshSessionMiddleware],
        },
        async (ctx) => {
          const userId = ctx.context.session.user.id
          if ((await countSignInMethods(ctx.context.adapter, userId)) <= 1)
            throw new APIError("BAD_REQUEST", {
              message: "An account needs at least one way to sign in",
            })
          await ctx.context.adapter.deleteMany({
            model: "walletAddress",
            where: [
              { field: "userId", value: userId },
              { field: "address", value: ctx.body.address },
            ],
          })
          return ctx.json({ ok: true })
        }
      ),
    },
  }) satisfies BetterAuthPlugin
