CREATE TABLE "course_streak_day" (
	"user_id" text NOT NULL,
	"day" date NOT NULL,
	"utc_offset" integer NOT NULL,
	"first_at" timestamp NOT NULL,
	"last_at" timestamp NOT NULL,
	"verified" boolean NOT NULL,
	CONSTRAINT "course_streak_day_user_id_day_pk" PRIMARY KEY("user_id","day")
);
--> statement-breakpoint
DROP INDEX "passkey_credentialID_idx";--> statement-breakpoint
ALTER TABLE "course_streak_day" ADD CONSTRAINT "course_streak_day_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "show_on_leaderboard";--> statement-breakpoint
-- Wallets are mainnet-only now: keep the oldest row per address and passkey credential before the unique indexes
DELETE FROM "wallet_address" w USING "wallet_address" k WHERE w."address" = k."address" AND (k."created_at", k."id") < (w."created_at", w."id");--> statement-breakpoint
UPDATE "wallet_address" SET "chain_id" = 1 WHERE "chain_id" <> 1;--> statement-breakpoint
DELETE FROM "passkey" p USING "passkey" k WHERE p."credential_id" = k."credential_id" AND (coalesce(k."created_at", 'epoch'), k."id") < (coalesce(p."created_at", 'epoch'), p."id");--> statement-breakpoint
CREATE UNIQUE INDEX "walletAddress_address_idx" ON "wallet_address" USING btree ("address");--> statement-breakpoint
CREATE UNIQUE INDEX "passkey_credentialID_idx" ON "passkey" USING btree ("credential_id");