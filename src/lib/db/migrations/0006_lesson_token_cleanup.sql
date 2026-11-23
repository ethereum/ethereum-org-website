DELETE FROM "course_lesson_session" WHERE "completed_at" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "course_lesson_session_started_idx" ON "course_lesson_session" USING btree ("started_at");--> statement-breakpoint
ALTER TABLE "course_lesson_session" DROP COLUMN "completed_at";