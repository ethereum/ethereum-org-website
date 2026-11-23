ALTER TABLE "account" ALTER COLUMN "access_token_expires_at" SET DATA TYPE timestamp with time zone USING "access_token_expires_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "refresh_token_expires_at" SET DATA TYPE timestamp with time zone USING "refresh_token_expires_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "passkey" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone USING "expires_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone USING "expires_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "wallet_address" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_exam_answer" ALTER COLUMN "answered_at" SET DATA TYPE timestamp with time zone USING "answered_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_exam_answer" ALTER COLUMN "answered_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "course_exam_attempt" ALTER COLUMN "started_at" SET DATA TYPE timestamp with time zone USING "started_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_exam_attempt" ALTER COLUMN "started_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "course_exam_attempt" ALTER COLUMN "finished_at" SET DATA TYPE timestamp with time zone USING "finished_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_lesson_completion" ALTER COLUMN "completed_at" SET DATA TYPE timestamp with time zone USING "completed_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_lesson_session" ALTER COLUMN "started_at" SET DATA TYPE timestamp with time zone USING "started_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_lesson_session" ALTER COLUMN "started_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "course_lesson_session" ALTER COLUMN "completed_at" SET DATA TYPE timestamp with time zone USING "completed_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_mastery" ALTER COLUMN "passed_at" SET DATA TYPE timestamp with time zone USING "passed_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_progress_state" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_progress_state" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "course_streak_day" ALTER COLUMN "first_at" SET DATA TYPE timestamp with time zone USING "first_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "course_streak_day" ALTER COLUMN "last_at" SET DATA TYPE timestamp with time zone USING "last_at" AT TIME ZONE 'UTC';