import { createAuthEndpoint, sessionMiddleware } from "better-auth/api"
import { APIError } from "better-auth/api"
import type { BetterAuthPlugin } from "better-auth/types"
import { getAddress } from "viem"
import { parseSiweMessage } from "viem/siwe"
import * as z from "zod"

import { AUTH_DOMAIN } from "./origin"
import { verifyWalletSignature } from "./verify-wallet"

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
  adapter: {
    count: (args: {
      model: string
      where: { field: string; value: string }[]
    }) => Promise<number>
  },
  userId: string
) => {
  const where = [{ field: "userId", value: userId }]
  const [passkeys, wallets] = await Promise.all([
    adapter.count({ model: "passkey", where }),
    adapter.count({ model: "walletAddress", where }),
  ])
  return passkeys + wallets
}

/**
 * The SIWE plugin signs in by wallet, creating an account for a new one, so
 * it can't add a wallet to the account that's signed in. These endpoints do:
 * a backup wallet for an account started with a passkey.
 */
export const walletLinking = () =>
  ({
    id: "wallet-linking",
    endpoints: {
      linkWallet: createAuthEndpoint(
        "/wallet/link",
        {
          method: "POST",
          body: z.object({ message: z.string().min(1), signature: z.string() }),
          use: [sessionMiddleware],
        },
        async (ctx) => {
          const { message, signature } = ctx.body
          const parsed = parseSiweMessage(message)
          const expired =
            parsed.expirationTime && parsed.expirationTime <= new Date()
          if (
            !parsed.address ||
            !parsed.nonce ||
            !parsed.chainId ||
            parsed.domain?.toLowerCase() !== AUTH_DOMAIN ||
            expired
          )
            throw new APIError("UNAUTHORIZED", { message: "Invalid message" })
          const nonce =
            await ctx.context.internalAdapter.consumeVerificationValue(
              `${SIWE_NONCE_PREFIX}${parsed.nonce}`
            )
          if (!nonce)
            throw new APIError("UNAUTHORIZED", { message: "Invalid nonce" })
          const address = getAddress(parsed.address)
          const valid = await verifyWalletSignature({
            message,
            signature,
            address,
            chainId: parsed.chainId,
          })
          if (!valid)
            throw new APIError("UNAUTHORIZED", { message: "Invalid signature" })

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
                chainId: parsed.chainId,
                isPrimary: false,
                createdAt: new Date(),
              },
            })
          return ctx.json({ address })
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
          return ctx.json(
            wallets.map(({ address, createdAt }) => ({ address, createdAt }))
          )
        }
      ),
      unlinkWallet: createAuthEndpoint(
        "/wallet/unlink",
        {
          method: "POST",
          body: z.object({ address: z.string() }),
          use: [sessionMiddleware],
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
              { field: "address", value: getAddress(ctx.body.address) },
            ],
          })
          return ctx.json({ ok: true })
        }
      ),
    },
  }) satisfies BetterAuthPlugin
